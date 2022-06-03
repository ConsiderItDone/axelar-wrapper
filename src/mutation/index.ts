import { getGatewayContractAddress } from "../utils/contractAddress";
import {
  Ethereum_Mutation,
  Input_sendToken,
  Input_approve,
  requireEnv,
  Input_approveAndSendToken,
} from "./w3";

export function approveAndSendToken(input: Input_approveAndSendToken): string {
  const approved = approve({
    spender: input.destinationAddress,
    amount: input.amount,
  });
  if (!approved) {
    throw Error("Not approved");
  }

  return sendToken({
    destinationChain: input.destinationChain,
    destinationAddress: input.destinationAddress,
    symbol: input.symbol,
    amount: input.amount,
  });
}

export function sendToken(input: Input_sendToken): string {
  const env = requireEnv();
  const chainId = env.chainId;

  const contractAddress = getGatewayContractAddress(chainId);

  const res = Ethereum_Mutation.callContractMethod({
    address: contractAddress,
    method:
      "function sendToken(string destinationChain, string destinationAddress, string symbol, uint256 amount)", //"function sendToken(string memory destinationChain, string memory destinationAddress, string memory symbol, uint256 amount)"
    args: [
      input.destinationChain,
      input.destinationAddress,
      input.symbol,
      input.amount.toString(),
    ],
    connection: null,
    txOverrides: null,
  }).unwrap();

  return res.data;
}

export function approve(input: Input_approve): boolean {
  const env = requireEnv();
  const chainId = env.chainId;

  const contractAddress = getGatewayContractAddress(chainId);

  const res = Ethereum_Mutation.callContractMethod({
    address: contractAddress,
    method: "function approve(address spender, uint256 amount)",
    args: [input.spender, input.amount.toString()],
    connection: null,
    txOverrides: null,
  });

  return res.isOk;
}
