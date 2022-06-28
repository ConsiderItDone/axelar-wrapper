import { Web3ApiClient } from "@web3api/client-js";
import nock from "nock";
import { randomUUID } from "crypto";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../../utils";

jest.setTimeout(360000);

describe("e2e tests for HttpPlugin", () => {
  let apiUri: string;
  let client: Web3ApiClient;

  const resourceUri = "https://nest-server-testnet.axelar.dev";

  beforeAll(async () => {
    const { ensAddress, ipfs, ethereum, registrarAddress, resolverAddress } =
      await initTestEnvironment();
    const apiPath: string = path.join(
      path.resolve(__dirname),
      "..",
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

  it("Get OneTimeCode", async () => {
    const publicAddress = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
    nock(resourceUri)
      //.defaultReplyHeaders(defaultReplyHeaders)
      .get("/otc")
      .query({ publicAddress })
      .reply(
        200,
        `{"validationMsg":"Verify I'm a real user with this one-time-code: jYsqMjcYEx (This will not cost any fees)","otc":"jYsqMjcYEx"}`
      );

    const response = await client.query<{ getOneTimeCode: any }>({
      uri: apiUri,
      query: `
      query {
        getOneTimeCode(
          signerAddress: $signerAddress
          traceId: $traceId 
        )
      }`,
      variables: {
        signerAddress: publicAddress,
        traceId: randomUUID(),
      },
    });

    expect(response.errors).toBeFalsy();
    expect(response.data).toBeTruthy();

    const oneTimeCode = response.data?.getOneTimeCode;
    expect(oneTimeCode).toBeTruthy();

    expect(oneTimeCode).toHaveProperty("otc");
    expect(oneTimeCode.otc).toEqual("jYsqMjcYEx");

    expect(oneTimeCode).toHaveProperty("validationMsg");
    expect(oneTimeCode.validationMsg).toEqual(
      "Verify I'm a real user with this one-time-code: jYsqMjcYEx (This will not cost any fees)"
    );
  });

  it("Get Room Id", async () => {
    nock(resourceUri)
      .post("/transfer-assets")
      .reply(200, `{"data": {"roomId":"123"} }`);

    const response = await client.query<{ getInitRoomId: any }>({
      uri: apiUri,
      query: `
      query {
        getInitRoomId(
          fromChain: $fromChain
          toChain: $toChain
          destinationAddress: $destinationAddress
          asset: $asset
          publicAddress: $publicAddress
          signature: $signature
          oneTimeCode: $oneTimeCode
          traceId: $traceId
        )
      }`,
      variables: {
        fromChain: "Terra",
        toChain: "Avalanche",
        destinationAddress: "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD",
        asset: "uusd",
        publicAddress: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
        signature: "signature",
        oneTimeCode: "jYsqMjcYEx",
        traceId: randomUUID(),
      },
    });

    expect(response.errors).toBeFalsy();
    expect(response.data).toBeTruthy();

    const roomId = response.data?.getInitRoomId;

    expect(roomId).toBeTruthy();
    expect(roomId).toEqual("123");
  });
});
