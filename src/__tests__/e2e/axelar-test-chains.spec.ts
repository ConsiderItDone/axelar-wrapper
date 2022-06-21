import { Web3ApiClient } from "@web3api/client-js";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../utils";
import { Network } from "@axelar-network/axelar-local-dev/src/Network";
const axelar = require("@axelar-network/axelar-local-dev");
import nock from "nock";
import BN from "bn.js";
import { Wallet } from "ethers";
const wrapperPath = `${__dirname}/integration`
const CLIENT_API_GET_OTC = "/getOneTimeCode";
const url = `https://bridge-rest-server.devnet.axelar.dev`;

jest.setTimeout(360000);

const defaultReplyHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-credentials': 'true'
}

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

    await chain1.giveToken(user1.address, "aUSDC", BigInt(1230000));

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

    const amount = new BN("30000");
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
      variables: {
        destinationChain: chain2.name,
        destinationAddress: user2.address,
        tokenAddress: chain1.usdc.address,
        gatewayAddress: chain1.gateway.address,
        symbol: "aUSDC",
        amount: amount.toString(),
      },
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

    const res = result.data?.approveAndSendToken;
    console.log("result", res);

    await axelar.relay();

    //await new Promise((r) => setTimeout(r, 30000));

    const balanceAfter1 = await chain1.usdc.balanceOf(user1.address);
    const balanceAfter2 = await chain2.usdc.balanceOf(user2.address);

/*     while (true) {
      const newBalance = await chain2.usdc.balanceOf(user2.address);
      console.log(`user2 has ${newBalance} aUSDC AFTER.`);

      if (BigInt(balanceBefore2) != BigInt(newBalance)) break;
      await new Promise((r) => setTimeout(r, 5000));
    } */

    const approveAndSendToken = result.data?.approveAndSendToken;
    expect(approveAndSendToken).toBeTruthy();

    console.log(`user1 has ${balanceAfter1} aUSDC AFTER.`);
    console.log(`user2 has ${balanceAfter2} aUSDC AFTER.`);

    expect(balanceBefore1.toNumber() - amount.toNumber()).toEqual(
      balanceAfter1.toNumber()
    );
    //expect(balanceBefore2.toNumber() + amount.toNumber()).toEqual(balanceAfter2.toNumber());
  });

  it("Sign message ", async () => {
    // expect(response).toBeTruthy();
    const resGetSignerAddress =  await client.query<{ getSignerAddress: string }> ({
      uri: apiUri,
      query: `
        mutation {
          signMessage(
            connection: $connection,
            message: $message
            )
        }
      `,
        variables: { 
          connection : {
          networkNameOrChainId: '1',
          node: null,
          },
        }
       });
       
    nock(url, { reqheaders: { 'X-Request-Header': "req-foo" } })
    .defaultReplyHeaders(defaultReplyHeaders)
    .get(`/${CLIENT_API_GET_OTC} + ?publicAddress=${resGetSignerAddress}`)
    .query('Hello world')
    .reply(200, '{data: "test-response"}', { 'X-Response-Header': "resp-foo" })

    const response = await client.query<{ signMessage: string }> ({
      uri: apiUri,
      query: `
        mutation {
          signMessage(
            connection: $connection,
            message: $message
            )
        }
      `,
        variables: { 
          connection : {
          networkNameOrChainId: '1',
          node: null,
          },
          message : 'Hello world'},
       });
    console.log('response', response);
    
  expect(response.errors).toBeUndefined();

     
  const res = await client.query<{ get: Response }>({
    uri: apiUri,
    query: `query {
      get(
        url: $url
        request: {
          responseType: TEXT
          urlParams: [{key: "query", value: "foo"}]
          headers: [{key: "X-Request-Header", value: "req-foo"}]
        }
      )
    }`,
    variables: {
      url : url + CLIENT_API_GET_OTC + `?publicAddress=${resGetSignerAddress}`
    }
  });

  expect(res.data).toBeDefined()
  expect(res.errors).toBeUndefined()
  expect(res.data?.get.status).toBe(200)
  });
});
