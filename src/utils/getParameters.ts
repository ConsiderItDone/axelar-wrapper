import { AssetInfo, AssetTransferObject, Chain, ChainInfo } from "./types";

const ChainList: Chain[] = [
  // https://github.com/axelarnetwork/axelarjs-sdk/blob/b3b149b9c584e08cc202a4fe6b6f24b62f3a3f90/src/chains/index.ts
];

export const getParameters = (
  destinationAddress: string,
  sourceChainName: string = "terra",
  destinationChainName: string = "avalanche",
  asset_common_key: string = "uusd"
) => {
  /*
	info for sourceChainInfo and destinationChainInfo fetched from the ChainList module. 
	* */
  const terraChain: ChainInfo = ChainList.map(
    (chain: Chain) => chain.chainInfo
  ).find(
    (chainInfo: ChainInfo) =>
      chainInfo.chainName.toLowerCase() === sourceChainName.toLowerCase()
  ) as ChainInfo;
  const avalancheChain: ChainInfo = ChainList.map(
    (chain: Chain) => chain.chainInfo
  ).find(
    (chainInfo: ChainInfo) =>
      chainInfo.chainName.toLowerCase() === destinationChainName.toLowerCase()
  ) as ChainInfo;
  const assetObj = terraChain.assets?.find(
    (asset: AssetInfo) => asset.common_key === asset_common_key
  ) as AssetInfo;

  let requestPayload: AssetTransferObject = {
    sourceChainInfo: terraChain,
    destinationChainInfo: avalancheChain,
    selectedSourceAsset: assetObj,
    selectedDestinationAsset: {
      ...assetObj,
      assetAddress: destinationAddress, //address on the destination chain where you want the tokens to arrive
    },
    signature: "SIGNATURE_FROM_METAMASK_SIGN",
    otc: "OTC_RECEIVED_FROM_SERVER",
    publicAddr: "SIGNER_OF_SIGNATURE",
    transactionTraceId: "YOUR_OWN_UUID", //your own UUID, helpful for tracing purposes. optional.
  };

  return requestPayload;
};
