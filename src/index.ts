import {
  HTTP_Module,
  HTTP_ResponseType,
  Ethereum_Module,
  Args_getOneTimeCode,
  Args_getDepositAddress,
  Args_approve,
  Args_approveAndSendToken,
  Ethereum_TxReceipt,
  Ethereum_TxOverrides,
  Ethereum_Connection,
  Axelar_Module,
  Args_sendToken,
  Args_getInitRoomId,
} from "./wrap";
import { JSON } from "@polywrap/wasm-as";

import { OTCResponce } from "./wrap/OTCResponce";

import {
  toDepositAddress,
  toOtc,
  toRoomId,
  getHeaders,
  getParameters,
} from "./utils";

// https://github.com/axelarnetwork/axelarjs-sdk/blob/main/README.md#security-mesures
export function getDepositAddress(args: Args_getDepositAddress): string | null {
  const traceId = Axelar_Module.getTraceId({}).unwrap();

  // TODO validate Destination Address

  const signerAddress = Ethereum_Module.getSignerAddress({
    connection: null,
  }).unwrap();

  const otc = getOneTimeCode({ signerAddress, traceId });

  if (otc == null) {
    throw Error("Unable to get One Time Code");
  } else {
    const signature = Ethereum_Module.signMessage({
      message: otc.validationMsg,
      connection: null,
    }).unwrap();

    const roomId = getInitRoomId({
      fromChain: args.fromChain,
      toChain: args.toChain,
      destinationAddress: args.destinationAddress,
      asset: args.asset,
      publicAddress: signerAddress,
      oneTimeCode: otc.otc,
      signature: signature,
      traceId: traceId,
    });

    if (roomId != null) {
      const depositAddress = Axelar_Module.getLinkEvent({
        roomId: roomId!,
      }).unwrap();

      return toDepositAddress(JSON.parse(depositAddress));
    }
    return null;
  }
}

export function getInitRoomId(args: Args_getInitRoomId): string | null {
  const config = Axelar_Module.getConfig({}).unwrap();
  const headers = getHeaders(args.traceId);

  const payload = getParameters(
    args.fromChain,
    args.toChain,
    args.destinationAddress,
    args.asset,
    args.publicAddress,
    args.signature
  );

  const response = HTTP_Module.post({
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

export function getOneTimeCode(args: Args_getOneTimeCode): OTCResponce | null {
  const config = Axelar_Module.getConfig({}).unwrap();

  const response = HTTP_Module.get({
    url: config.resourceUrl + `/otc?publicAddress=${args.signerAddress}`,
    request: {
      responseType: HTTP_ResponseType.TEXT,
      headers: [
        { key: "Content-Type", value: "application/json" },
        {
          key: "x-trace-id",
          value: args.traceId,
        },
        {
          key: "User-Agent",
          value: "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
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

export function approveAndSendToken(
  args: Args_approveAndSendToken
): Ethereum_TxReceipt {
  const txOverrides: Ethereum_TxOverrides =
    args.txOverrides != null
      ? args.txOverrides!
      : { gasLimit: null, gasPrice: null, value: null };

  const connection: Ethereum_Connection =
    args.connection != null
      ? args.connection!
      : {
          networkNameOrChainId: null,
          node: null,
        };

  const approved = approve({
    amount: args.amount,
    tokenAddress: args.tokenAddress,
    gatewayAddress: args.gatewayAddress,
    connection: connection,
    txOverrides: txOverrides,
  });

  if (!approved) {
    throw Error("Not approved");
  }

  return sendToken({
    destinationChain: args.destinationChain,
    destinationAddress: args.destinationAddress,
    symbol: args.symbol,
    amount: args.amount,
    gatewayAddress: args.gatewayAddress,
    connection: args.connection,
    txOverrides: txOverrides,
  });
}

export function sendToken(args: Args_sendToken): Ethereum_TxReceipt {
  const res = Ethereum_Module.callContractMethodAndWait({
    address: args.gatewayAddress, // gateway address
    method:
      "function sendToken(string destinationChain, string destinationAddress, string symbol, uint256 amount)", //"function sendToken(string memory destinationChain, string memory destinationAddress, string memory symbol, uint256 amount)"
    args: [
      args.destinationChain,
      args.destinationAddress,
      args.symbol,
      args.amount.toString(),
    ],
    connection: args.connection,
    txOverrides: args.txOverrides,
  }).unwrap();

  return res;
}

export function approve(args: Args_approve): Ethereum_TxReceipt {
  const res = Ethereum_Module.callContractMethodAndWait({
    address: args.tokenAddress, //tokenAddress
    method: "function approve(address spender, uint256 amount)",
    args: [args.gatewayAddress, args.amount.toString()], // spender = gateway address
    connection: args.connection,
    txOverrides: args.txOverrides,
  }).unwrap();

  return res;
}
