import {
  Ethereum_Mutation,
  Input_sendToken,
  Input_approve,
  requireEnv,
  Input_approveAndSendToken,
  Ethereum_Query,
  Input_signMessage,
  HTTP_Query,
  Input_getOneTimeCode,
  Input_getSignerAddress,
  SignerAddress,
  HTTP_ResponseType,
  Ethereum_TxReceipt,
} from "./w3";
import { BigInt } from "@web3api/wasm-as";
const CLIENT_API_GET_OTC = "/getOneTimeCode";


export function approveAndSendToken(
  input: Input_approveAndSendToken
): Ethereum_TxReceipt {
  const approved = approve({
    amount: input.amount,
    tokenAddress: input.tokenAddress,
    gatewayAddress: input.gatewayAddress,
  });

  if (!approved) {
    throw Error("Not approved");
  }

  return sendToken({
    destinationChain: input.destinationChain,
    destinationAddress: input.destinationAddress,
    symbol: input.symbol,
    amount: input.amount,
    gatewayAddress: input.gatewayAddress,
  });
}

export function sendToken(input: Input_sendToken): Ethereum_TxReceipt {
  const env = requireEnv();
  const chainId = env.chainId;

  const res = Ethereum_Mutation.callContractMethodAndWait({
    address: input.gatewayAddress, // gateway address
    method:
      "function sendToken(string destinationChain, string destinationAddress, string symbol, uint256 amount)", //"function sendToken(string memory destinationChain, string memory destinationAddress, string memory symbol, uint256 amount)"
    args: [
      input.destinationChain,
      input.destinationAddress,
      input.symbol,
      input.amount.toString(),
    ],
    connection: {
      networkNameOrChainId: chainId.toString(),
      node: null,
    },
    txOverrides: {
      gasLimit: BigInt.fromString("100000"),
      gasPrice: null,
      value: null,
    },
  }).unwrap();

  return res;
}

export function approve(input: Input_approve): Ethereum_TxReceipt {
  const env = requireEnv();
  const chainId = env.chainId;


  const res = Ethereum_Mutation.callContractMethodAndWait({
    address: input.tokenAddress, //tokenAddress
    method: "function approve(address spender, uint256 amount)",
    args: [input.gatewayAddress, input.amount.toString()], // spender = gateway address
    connection: {
      networkNameOrChainId: chainId.toString(),
      node: null,
    },
    txOverrides: {
      gasLimit: BigInt.fromString("100000"),
      gasPrice: null,
      value: null,
    },
  }).unwrap();

  return res;
}

export function  signMessage(input: Input_signMessage): SignerAddress{
  const value = getSignerAddress({connection: input.connection})
  const valueGetOneTimeCode = getOneTimeCode({signerAddress: value})
  return valueGetOneTimeCode
  // return {validationMsg: null, otc:  null}
}

export function getSignerAddress(
  input: Input_getSignerAddress
): string {
  return Ethereum_Query.getSignerAddress({
    connection: input.connection
  }).unwrap();
}

export  function getOneTimeCode( input: Input_getOneTimeCode):  SignerAddress {
  HTTP_Query.get({
  url: CLIENT_API_GET_OTC + `?publicAddress=${input.signerAddress}`,
  request: {
    headers: [],
    urlParams: [],
    body: "",
    responseType: HTTP_ResponseType.TEXT,
  }}).unwrap()
  //  {url: CLIENT_API_GET_OTC + `?publicAddress=${input.signerAddress}`,
  //     request: null}).unwrap()?.body!;
  // return JSON.parse(response)
return {validationMsg: null, otc:  null}
}