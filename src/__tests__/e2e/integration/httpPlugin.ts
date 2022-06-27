import { Web3ApiClient } from "@web3api/client-js";
import { httpPlugin } from "@web3api/http-plugin-js";

import nock from "nock";
import { randomUUID } from "crypto";

jest.setTimeout(360000);

const defaultReplyHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-credentials": "true",
};

describe("e2e tests for HttpPlugin", () => {
  let client: Web3ApiClient;

  const resourceUri = "https://nest-server-testnet.axelar.dev";

  beforeAll(async () => {
    client = new Web3ApiClient({
      plugins: [
        {
          uri: "w3://ens/http.polywrap.eth",
          //@ts-ignore
          plugin: httpPlugin({ query: {} }),
        },
      ],
    });
  });

  it("Get OneTimeCode", async () => {
    const publicAddress = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";
    nock(resourceUri)
      //.defaultReplyHeaders(defaultReplyHeaders)
      .get("/otc")
      .query({ publicAddress })
      .reply(
        200,
        `{data: "{"validationMsg":"Verify I'm a real user with this one-time-code: jYsqMjcYEx (This will not cost any fees)","otc":"jYsqMjcYEx"}"`
      );

    const response = await client.query<{ get: any }>({
      uri: "w3://ens/http.polywrap.eth",
      query: `
      query {
        get(
          url: "${resourceUri}/otc"
          request: {
            responseType: TEXT
            urlParams: [{key: "publicAddress", value: "${publicAddress}"}]
            headers: [{key: "Content-Type", value: "application/json"}, {key: "x-trace-id", value: "${randomUUID()}"}, {key: "User-Agent", value: "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"}]
          }
        )
      }`,
    });

    expect(response.errors).toBeFalsy();
    expect(response.data?.get.status).toBe(200);
    expect(response.data?.get.body).toBe(
      `{data: "{"validationMsg":"Verify I'm a real user with this one-time-code: jYsqMjcYEx (This will not cost any fees)","otc":"jYsqMjcYEx"}"`
    );
  });

  it("Get Room Id", async () => {
    const publicAddress = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";

    const reqPayloadStringified = `{fromChain: 'Terra', toChain: 'Avalanche', destinationAddress: '${publicAddress}', asset: 'uusd', publicAddress: '${publicAddress}', signature: 'signature'}`;

    const resPayload = {
      roomId: "123",
    };

    const resPayloadStringfified = JSON.stringify(resPayload).replace(`"`, `'`);

    nock(resourceUri)
      .defaultReplyHeaders(defaultReplyHeaders)
      .post("/transfer-assets", reqPayloadStringified)
      .reply(200, resPayloadStringfified);

    const response = await client.query<{ post: any }>({
      uri: "w3://ens/http.polywrap.eth",
      query: `
      query {
        post(
          url: "${resourceUri}/transfer-assets"
          request: {
            responseType: TEXT
            body: "${reqPayloadStringified}"
          }
        )
      }`,
    });

    expect(response.errors).toBeFalsy();
    expect(response.data?.post.status).toBe(200);
    console.log(response.data?.post.body);
    expect(response.data?.post.body).toBe("{'roomId\":\"123\"}");
  });
});
