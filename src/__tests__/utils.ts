import { Network } from "@axelar-network/axelar-local-dev/src/Network";
import { ClientConfig } from "@web3api/client-js";
import { ensPlugin } from "@web3api/ens-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import { Wallet, ethers } from "ethers";

/* import axios from "axios";
import path from "path";
 */

interface ChainUser {
  chain: Network;
  user: Wallet;
}
export function getPlugins(
  ethereum: string,
  ipfs: string,
  ensAddress: string,
  axelarChains?: ChainUser[]
): Partial<ClientConfig> {
  const customChains = {};
  if (axelarChains?.length) {
    axelarChains.forEach((chain) => {
      //@ts-ignore
      customChains[chain.chain.chainId.toString()] = {
        provider: chain.chain.provider,
        signer: chain.user,
      };
    });
  }

  const privateKey =
    "8ca435f1321b8043d984d95776cf53f570f2e296f86a8b0c9ddbd7c537cee6a2";
  const ropstenUri =
    "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

  const wallet = new Wallet(
    privateKey,
  );
  return {
    redirects: [],
    plugins: [
      {
        uri: "w3://ens/ipfs.web3api.eth",
        plugin: ipfsPlugin({ provider: ipfs }),
      },
      {
        uri: "w3://ens/ens.web3api.eth",
        plugin: ensPlugin({ query: { addresses: { testnet: ensAddress } } }),
      },
      {
        uri: "w3://ens/ethereum.web3api.eth",
        //@ts-ignore
        plugin: ethereumPlugin({
          //@ts-ignore
          networks: {
            testnet: {
              provider: ethereum,
            },
/*             ropsten: {
              //@ts-ignore
              provider: ropstenUri,
              signer: wallet,
            }, */
            ...customChains,
          },
          defaultNetwork: "testnet",
        }),
      },
    ],
  };
}

/* export async function getProviders(): Promise<TestEnvironment> {
  const {
    data: { ipfs, ethereum },
  } = await axios.get("http://localhost:4040/providers");
  const { data } = await axios.get("http://localhost:4040/deploy-ens");
  const clientConfig = getPlugins(ethereum, ipfs, data.ensAddress);
  return { ipfs, ethereum, ensAddress: data.ensAddress, clientConfig };
}
 */
