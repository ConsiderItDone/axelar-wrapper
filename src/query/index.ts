import { stringify } from "@web3api/serial-as-json";
import { getParameters } from "../utils/getParameters";
import { getHeaders } from "../utils/getHeaders";
import { Input_getDepositAddress, HTTP_Query, HTTP_ResponseType } from "./w3";

// https://github.com/axelarnetwork/axelarjs-sdk/blob/main/README.md#security-mesures
export function getDepositAddress(
  input: Input_getDepositAddress
): String | null {
  const CLIENT_API_POST_TRANSFER_ASSET = "/transferAssets";

  const payload = getParameters(
    input.destinationAddress,
    input.fromChain,
    input.toChain,
    input.asset
  );
  const headers = getHeaders(payload);

  const response = HTTP_Query.post({
    url: CLIENT_API_POST_TRANSFER_ASSET,
    request: {
      responseType: HTTP_ResponseType.TEXT,
      headers: headers,
      body: stringify(payload),
      urlParams: null,
    },
  }).unwrap();

  if (response != null) {
    if (response.body != null) {
      return response.body;
    }
  }

  return null;
}
