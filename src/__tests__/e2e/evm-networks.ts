import { Web3ApiClient } from "@web3api/client-js";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../utils";
import BN from "bn.js";

jest.setTimeout(360000);

describe("e2e", () => {
  let apiUri: string;
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

    const config = getPlugins(ethereum, ipfs, ensAddress);

    client = new Web3ApiClient(config);
  });

  it("Send transaction", async () => {
    const result = await client.query<{ approveAndSendToken: any }>({
      uri: apiUri,
      query: `
      mutation {
        approveAndSendToken(
          destinationChain: $destinationChain
          destinationAddress: $destinationAddress
          symbol: $symbol
          amount: $amount
          contractAddress: $contractAddress
        )
      }`,
      variables: {
        destinationChain: "80001",
        destinationAddress: "0xd405aebF7b60eD2cb2Ac4497Bddd292DEe534E82",
        contractAddress: null,
        symbol: "aUSDC",
        amount: new BN("1").toString(),
      },
      config: {
        envs: [
          {
            uri: apiUri,
            common: {
              chainId: 3,
            },
          },
        ],
      },
    });

    console.log("result", result);

    //expect(result.data).toBeTruthy();
    //expect(result.errors).toBeFalsy();

    //await axelar.relay();

    /*     const balanceAfter1 = await chain1.usdc.balanceOf(user1.address);
    const balanceAfter2 = await chain2.usdc.balanceOf(user2.address);
 */
    //console.log('chain2 info', chain2.getInfo())
    /*     console.log(`user1 has ${balanceAfter1} aUSDC AFTER.`);
    console.log(`user2 has ${balanceAfter2} aUSDC AFTER.`); */

    //const approveAndSendToken = result.data?.approveAndSendToken;
    //expect(approveAndSendToken).toBeTruthy();

    /*     await chain1.giveToken(user1.address, "aUSDC", 1000); 

    // Approve the AxelarGateway to use our aUSDC on chain1.
    await (
      await chain1.usdc.connect(user1).approve(chain1.gateway.address, 100)
    ).wait();
    // And have it send it to chain2.
    await (
      await chain1.gateway
        .connect(user1)
        .sendToken(chain2.name, user2.address, "aUSDC", 100)
    ).wait(); */

    // Have axelar relay the tranfer to chain2.
    //await axelar.relay();
  });
});
