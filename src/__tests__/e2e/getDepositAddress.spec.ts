import { Web3ApiClient } from "@web3api/client-js";
import { initTestEnvironment, buildAndDeployApi } from "@web3api/test-env-js";
import path from "path";
import { getPlugins } from "../utils";

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

  it("Get deposit address", async () => {
    const destinationAddress = "0xF16DfB26e1FEc993E085092563ECFAEaDa7eD7fD";

    const result = await client.query<{ getDepositAddress: any }>({
      uri: apiUri,
      query: `
      query {
        getDepositAddress(
          fromChain: $fromChain
          toChain: $toChain
          destinationAddress: $destinationAddress
          asset: $asset
          options: $options
        )
      }`,
      variables: {
        fromChain: "Terra",
        toChain: "Avalanche",
        destinationAddress: destinationAddress,
        asset: "uusd",
        options: null,
      },
    });
    expect(result.data).toBeTruthy();
    expect(result.errors).toBeFalsy();

    const depositAddress = result.data?.getDepositAddress;
    console.log("depositAddress", depositAddress);
    expect(depositAddress).toBeTruthy();
    expect(typeof depositAddress).toBe("string");
  });
});
