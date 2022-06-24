import { JSON } from "@web3api/wasm-as";

export function getParameters(
  sourceChainName: string, // = "terra",
  destinationChainName: string, // = "avalanche",
  destinationAddress: string,
  asset_common_key: string, //= "uusd",
  publicAddress: string,
  signature: string
): string {
  const payload = JSON.Value.Object();
  payload.set("fromChain", sourceChainName);
  payload.set("toChain", destinationChainName);
  payload.set("destinationAddress", destinationAddress);
  payload.set("asset", asset_common_key);
  payload.set("publicAddress", publicAddress);
  payload.set("signature", signature);

  return payload.stringify();
}
