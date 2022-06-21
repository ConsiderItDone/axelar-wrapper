import { JSON } from "@web3api/wasm-as";

export class AssetTransferObject {
  fromChain: string;
  toChain: string;
  destinationAddress: string;
  asset: string;
  publicAddress: string;
  signature: string;
}

export function getParameters(
  sourceChainName: string, // = "terra",
  destinationChainName: string, // = "avalanche",
  destinationAddress: string,
  asset_common_key: string, //= "uusd",
  publicAddress: string,
  signature: string
): string {
  const transferObj: AssetTransferObject = {
    fromChain: sourceChainName,
    toChain: destinationChainName,
    destinationAddress: destinationAddress,
    asset: asset_common_key,
    publicAddress: publicAddress,
    signature: signature,
  };

  return JSON.from(transferObj).stringify();
}
