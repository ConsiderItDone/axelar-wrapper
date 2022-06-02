import {
  initTestEnvironment,
  buildAndDeployApi
} from "@web3api/test-env-js";
import path from "path";


const axelar = require('@axelar-network/axelar-local-dev');

jest.setTimeout(360000);

describe("e2e", () => {
  let apiUri: string;
  let chain1: any;
  let chain2: any;
  
  beforeAll(async() => {
    const { ensAddress, ipfs } = await initTestEnvironment();
    const apiPath: string = path.resolve(__dirname + "/../../");
    const api = await buildAndDeployApi(apiPath, ipfs, ensAddress);
    apiUri = `ens/testnet/${api.ensDomain}`;
      chain1 = await  axelar.createNetwork();
      chain2 = await  axelar.createNetwork();
  })
  it('', async () => {
    const [ user1 ] = chain1.userWallets;
    const [ user2 ] = chain2.userWallets;
    await chain1.giveToken(user1.address, 'aUSDC', 1000);

    console.log(`user1 has ${await  chain1.usdc.balanceOf(user1.address)} aUSDC.`);
    console.log(`user2 has ${await  chain2.usdc.balanceOf(user2.address)} aUSDC.`);

    // Approve the AxelarGateway to use our aUSDC on chain1.
    await (await chain1.usdc.connect(user1).approve(chain1.gateway.address, 100)).wait();
    // And have it send it to chain2.
    await (await chain1.gateway.connect(user1).sendToken(chain2.name, user2.address, 'aUSDC', 100)).wait();
    // Have axelar relay the tranfer to chain2.
    await  axelar.relay();

    console.log(`user1 has ${await chain1.usdc.balanceOf(user1.address)} aUSDC.`);
    console.log(`user2 has ${await chain2.usdc.balanceOf(user2.address)} aUSDC.`);
  })
});
