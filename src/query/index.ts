import { getParameters } from "../utils/getParameters";
import { getHeaders } from "../utils/getHeaders";
import {
  Input_getDepositAddress,
  HTTP_Query,
  HTTP_ResponseType,
  Ethereum_Query,
  Axelar_Query,
  Input_getOneTimeCode,
} from "./w3";
import { JSON } from "@web3api/wasm-as";
import { Ethereum_Mutation } from "../mutation/w3";
import { toOtc, toRoomId } from "../utils/jsonmap";
import { Input_getInitRoomId } from "./w3/Query/serialization";
import { OTCResponce } from "./w3/OTCResponce";

// https://github.com/axelarnetwork/axelarjs-sdk/blob/main/README.md#security-mesures
export function getDepositAddress(
  input: Input_getDepositAddress
): string | null {
  const traceId = Axelar_Query.getTraceId({}).unwrap();

  // TODO validate Destination Address

  const signerAddress = Ethereum_Query.getSignerAddress({
    connection: null,
  }).unwrap();

  const otc = getOneTimeCode({ signerAddress, traceId });

  if (otc == null) {
    throw Error("Unable to get One Time Code");
  } else {
    const signature = Ethereum_Mutation.signMessage({
      message: otc.validationMsg,
      connection: null,
    }).unwrap();

    const roomId = getInitRoomId({
      fromChain: input.fromChain,
      toChain: input.toChain,
      destinationAddress: input.destinationAddress,
      asset: input.asset,
      publicAddress: signerAddress,
      oneTimeCode: otc.otc,
      signature: signature,
      traceId: traceId,
    });
    if (roomId != null) {
      const depositAddress = Axelar_Query.getLinkEvent({
        roomId: roomId!,
      }).unwrap();

      return depositAddress;
    }
    return null;
  }
}

export function getInitRoomId(input: Input_getInitRoomId): string | null {
  const config = Axelar_Query.getConfig({}).unwrap();
  const headers = getHeaders(
    input.publicAddress,
    input.signature,
    input.oneTimeCode
  );

  const payload = getParameters(
    input.fromChain,
    input.toChain,
    input.destinationAddress,
    input.asset,
    input.publicAddress,
    input.signature
  );

  const response = HTTP_Query.post({
    url: config.resourceUrl + "/transfer-assets",
    request: {
      responseType: HTTP_ResponseType.TEXT,
      headers: headers,
      body: payload,
      urlParams: null,
    },
  }).unwrap();

  if (response != null) {
    if (response.body != null) {
      return toRoomId(JSON.parse(response.body));
    }
  }
  return null;
}

export function getOneTimeCode(
  input: Input_getOneTimeCode
): OTCResponce | null {
  const config = Axelar_Query.getConfig({}).unwrap();

  const response = HTTP_Query.get({
    url: config.resourceUrl + `/otc?publicAddress=${input.signerAddress}`,
    request: {
      responseType: HTTP_ResponseType.TEXT,
      headers: [
        { key: "Content-Type", value: "application/json" },
        {
          key: "x-trace-id",
          value: input.traceId,
        },
      ],
      urlParams: null, // [{key:'publicAddress', value:input.signerAddress}],
      body: null,
    },
  }).unwrap();

  if (response !== null) {
    if (response.body != null) {
      return toOtc(JSON.parse(response.body));
    }
  }
  return null;
}
