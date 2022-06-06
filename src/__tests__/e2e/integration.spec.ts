import { Web3ApiClient } from "@web3api/client-js";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../utils";

const axelar = require("@axelar-network/axelar-local-dev");

jest.setTimeout(360000);

describe("e2e", () => {
  let apiUri: string;
  let chain1: any;
  let chain2: any;
  let client: Web3ApiClient;

  beforeAll(async () => {
    const { ensAddress, ipfs, ethereum, registrarAddress, resolverAddress } =
      await initTestEnvironment();
    const apiPath: string = path.join(
      path.resolve(__dirname),
      "..",
      "..",
      ".."
    );
    const api = await buildAndDeployApi({
      apiAbsPath: apiPath,
      ethereumProvider: ethereum,
      ipfsProvider: ipfs,
      ensResolverAddress: resolverAddress,
      ensRegistrarAddress: registrarAddress,
      ensRegistryAddress: ensAddress,
    });

    apiUri = `ens/testnet/${api.ensDomain}`;

    chain1 = await axelar.createNetwork();
    chain2 = await axelar.createNetwork();

    const config = getPlugins(ethereum, ipfs, ensAddress);
    client = new Web3ApiClient(config);
  });

  it("Send transaction", async () => {
    console.log("apiUri", apiUri);
    client.getPlugins();
    const [user1] = chain1.userWallets;
    const [user2] = chain2.userWallets;
    await chain1.giveToken(user1.address, "aUSDC", 1000); // @Yulia change it to client.query({uri:..., query:...})

    console.log(
      `user1 has ${await chain1.usdc.balanceOf(user1.address)} aUSDC.`
    );
    console.log(
      `user2 has ${await chain2.usdc.balanceOf(user2.address)} aUSDC.`
    );

    // Approve the AxelarGateway to use our aUSDC on chain1.
    await (
      await chain1.usdc.connect(user1).approve(chain1.gateway.address, 100)
    ).wait();
    // And have it send it to chain2.
    await (
      await chain1.gateway
        .connect(user1)
        .sendToken(chain2.name, user2.address, "aUSDC", 100)
    ).wait();

    // Have axelar relay the tranfer to chain2.
    await axelar.relay(); // @Yulia Leave it at the end

    

    console.log(
      `user1 has ${await chain1.usdc.balanceOf(user1.address)} aUSDC.`
    );
    console.log(
      `user2 has ${await chain2.usdc.balanceOf(user2.address)} aUSDC.`
    );
  });
});
