import { Network } from "@axelar-network/axelar-local-dev/src/Network";
import { ClientConfig } from "@web3api/client-js";
import { ensPlugin } from "@web3api/ens-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import { Wallet } from "ethers";
import { plugin as axelarPlugin } from "@cidt/axelar-polywrap-js";
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
        //@ts-ignore
        plugin: ipfsPlugin({ provider: ipfs }),
      },
      {
        uri: "w3://ens/ens.web3api.eth",
        //@ts-ignore
        plugin: ensPlugin({ query: { addresses: { testnet: ensAddress } } }),
      },
      {
        uri: "w3://ens/ethereum.web3api.eth",
        //@ts-ignore
        plugin: ethereumPlugin({
          networks: {
            testnet: {
              provider: ethereum,
              signer: new Wallet(
                "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
              ),
            },
            ...customChains,
          },
          defaultNetwork: "testnet",
        }),
      },
      {
        uri: "w3://ens/axelar.web3api.eth",
        //@ts-ignore
        plugin: axelarPlugin({ environment: "testnet" }),
      },
    ],
  };
}
