import { Web3ApiClient } from "@web3api/client-js";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../utils";
import { Network } from "@axelar-network/axelar-local-dev/src/Network";
const axelar = require("@axelar-network/axelar-local-dev");
import BN from "bn.js";
import { Wallet } from "ethers";

jest.setTimeout(360000);

describe("e2e", () => {
  let apiUri: string;
  let chain1: Network;
  let chain2: Network;
  let user1: Wallet;
  let user2: Wallet;
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

    user1 = chain1.userWallets[0];
    user2 = chain2.userWallets[0];

    await chain1.giveToken(user1.address, "aUSDC", BigInt("1000000000"));

    const config = getPlugins(ethereum, ipfs, ensAddress, [
      { chain: chain1, user: user1 },
      { chain: chain2, user: user2 },
    ]);

    client = new Web3ApiClient(config);
  });

  it("Send transaction", async () => {
    //console.log(chain1.name);

    const balanceBefore1 = await chain1.usdc.balanceOf(user1.address);
    const balanceBefore2 = await chain2.usdc.balanceOf(user2.address);

    console.log(`user1 has ${balanceBefore1} aUSDC BEFORE.`);
    console.log(`user2 has ${balanceBefore2} aUSDC BEFORE.`);

    const amount = new BN("100000000");

    console.log("Transfer Amount", amount.toString());

    const variables = {
      destinationChain: chain2.name,
      destinationAddress: user2.address,
      tokenAddress: chain1.usdc.address,
      gatewayAddress: chain1.gateway.address,
      symbol: "aUSDC",
      amount: amount.toString(),
    };
    console.log("variables", variables);
    const result = await client.query<{ approveAndSendToken: any }>({
      uri: apiUri,
      query: `
      mutation {
        approveAndSendToken(
          destinationChain: $destinationChain
          destinationAddress: $destinationAddress
          symbol: $symbol
          amount: $amount
          gatewayAddress: $gatewayAddress
          tokenAddress: $tokenAddress
        )
      }`,
      variables: variables,
      config: {
        envs: [
          {
            uri: apiUri,
            common: {
              chainId: chain1.chainId,
            },
          },
        ],
      },
    });

    expect(result.data).toBeTruthy();
    expect(result.errors).toBeFalsy();

    const transferResult = result.data?.approveAndSendToken;

    expect(transferResult).toBeTruthy();

    await axelar.relay();

    const balanceAfter1 = await chain1.usdc.balanceOf(user1.address);
    const balanceAfter2 = await chain2.usdc.balanceOf(user2.address);

    const approveAndSendToken = result.data?.approveAndSendToken;
    expect(approveAndSendToken).toBeTruthy();

    console.log(`user1 has ${balanceAfter1} aUSDC AFTER.`);
    console.log(`user2 has ${balanceAfter2} aUSDC AFTER.`);

    expect(balanceBefore1.toNumber() - amount.toNumber()).toEqual(
      balanceAfter1.toNumber()
    );
    expect(balanceBefore2).not.toEqual(balanceAfter2.toNumber());
  });
});
