import { Web3ApiClient } from "@web3api/client-js";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../utils";
import { BigInt } from "@web3api/wasm-as";
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
    const [user1] = chain1.userWallets;
    const [user2] = chain2.userWallets;
    console.log("user1", user1);

    const balanceBefore = await chain1.usdc.balanceOf(user1.address);
    const balanceBefore2 = await chain1.usdc.balanceOf(user2.address);

    console.log(`user1 has ${balanceBefore} aUSDC BEFORE.`);
    console.log(`user2 has ${balanceBefore2} aUSDC BEFORE.`);

    const result = await client.query<{ approveAndSendToken: any }>({
      uri: apiUri,
      query: `
      mutatuion {
        approveAndSendToken(
          destinationChain: $destinationChain
          destinationAddress: $destinationAddress
          symbol: $symbol
          amount: $amount
        )
      }`,
      variables: {
        destinationChain: "", //@Yulia chain comes from chain2
        destinationAddress: "", // user2
        symbol: "",
        amount: BigInt.fromString("0"),
      },
      config: {
        envs: [
          {
            uri: apiUri,
            common: {
              chainId: chain1, // //@Yulia find chainId in chain1
            },
          },
        ],
      },
    });

    expect(result.data).toBeTruthy();
    expect(result.errors).toBeFalsy();

    const sendTokenResult = result.data?.approveAndSendToken;

    // @Yulia change it to client.query({uri:..., query:...})

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
    await axelar.relay(); // @Yulia Leave it at the end

    console.log(
      `user1 has ${await chain1.usdc.balanceOf(user1.address)} aUSDC.`
    );
    console.log(
      `user2 has ${await chain2.usdc.balanceOf(user2.address)} aUSDC.`
    );
  });
});
