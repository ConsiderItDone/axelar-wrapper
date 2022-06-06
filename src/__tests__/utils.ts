import { ClientConfig } from "@web3api/client-js";
import { ensPlugin } from "@web3api/ens-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import axios from "axios";
 
interface TestEnvironment {
  ipfs: string;
  ethereum: string;
  ensAddress: string;
  clientConfig: Partial<ClientConfig>;
}

export async function getProviders(): Promise<TestEnvironment> {
  const { data: { ipfs, ethereum }, } = await axios.get("http://localhost:4040/providers");
  const { data } = await axios.get("http://localhost:4040/deploy-ens");
  const clientConfig = getPlugins(ethereum, ipfs, data.ensAddress);
  return { ipfs, ethereum, ensAddress: data.ensAddress, clientConfig, };
}
export const getPlugins = (
  ethereum: string,
  ipfs: string,
  ensAddress: string,
): Partial<ClientConfig<string>> => {
  return {
    plugins: [
      {
        uri: "w3://ens/ipfs.web3api.eth",
       plugin: ipfsPlugin({ provider: ipfs }),
      },
      {
        uri: "w3://ens/ipfs.web3api.eth",
        plugin: ipfsPlugin({ provider: ipfs }),
      },
      {
        uri: "w3://ens/ens.web3api.eth",
        plugin: ensPlugin({ addresses: { testnet: ensAddress } }),
      },
      {
        uri: "w3://ens/ethereum.web3api.eth",
        plugin: ethereumPlugin({
          networks: {
            testnet: {
              provider: ethereum,
            },
          },
          defaultNetwork: "testnet",
        }),
      },
    ],
  };
};

/* export async function getProviders(): Promise<TestEnvironment> {
  const {
    data: { ipfs, ethereum },
  } = await axios.get("http://localhost:4040/providers");
  const { data } = await axios.get("http://localhost:4040/deploy-ens");
  const clientConfig = getPlugins(ethereum, ipfs, data.ensAddress);
  return { ipfs, ethereum, ensAddress: data.ensAddress, clientConfig };
}
 */
