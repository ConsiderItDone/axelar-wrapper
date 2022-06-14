import { Network } from "@axelar-network/axelar-local-dev/src/Network";
import { ClientConfig } from "@web3api/client-js";
import { ensPlugin } from "@web3api/ens-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import { Wallet } from "ethers";

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
            ...customChains,
          },
          defaultNetwork: "testnet",
        }),
      },
    ],
  };
}
