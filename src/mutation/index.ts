import { getGatewayContractAddress } from "../utils/contractAddress";
import {
  Ethereum_Mutation,
  Input_sendToken,
  Input_approve,
  requireEnv,
  Input_approveAndSendToken,
  Ethereum_TxResponse,
  Ethereum_TxReceipt,
} from "./w3";
import { BigInt } from "@web3api/wasm-as";

export function approveAndSendToken(
  input: Input_approveAndSendToken
): Ethereum_TxReceipt {
  const approved = approve({
    spender: input.spender,
    amount: input.amount,
    contractAddress: input.contractAddress,
  });

  if (!approved) {
    throw Error("Not approved");
  }

  return sendToken({
    destinationChain: input.destinationChain,
    destinationAddress: input.destinationAddress,
    symbol: input.symbol,
    amount: input.amount,
    contractAddress: input.spender,
  });
}

export function sendToken(input: Input_sendToken): Ethereum_TxReceipt {
  const env = requireEnv();
  const chainId = env.chainId;

  let contractAddress: string;
  if (input.contractAddress != null) {
    contractAddress = <string>input.contractAddress;
  } else {
    contractAddress = getGatewayContractAddress(chainId); //TODO Token address ?
  }

  const res = Ethereum_Mutation.callContractMethodAndWait({
    address: contractAddress,
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

  let contractAddress: string;
  if (input.contractAddress != null) {
    contractAddress = <string>input.contractAddress;
  } else {
    contractAddress = getGatewayContractAddress(chainId);
  }

  const res = Ethereum_Mutation.callContractMethodAndWait({
    address: contractAddress,
    method: "function approve(address spender, uint256 amount)",
    args: [input.spender, input.amount.toString()],
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
