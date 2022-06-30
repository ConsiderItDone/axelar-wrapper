import {
  Ethereum_Mutation,
  Input_sendToken,
  Input_approve,
  Input_approveAndSendToken,
  Ethereum_TxReceipt,
  Ethereum_TxOverrides,
} from "./w3";
export function approveAndSendToken(
  input: Input_approveAndSendToken
): Ethereum_TxReceipt {
  const txOverrides: Ethereum_TxOverrides =
    input.txOverrides === null
      ? { gasLimit: null, gasPrice: null, value: null }
      : input.txOverrides!;

  const approved = approve({
    amount: input.amount,
    tokenAddress: input.tokenAddress,
    gatewayAddress: input.gatewayAddress,
    connection: input.connection,
    txOverrides: txOverrides,
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
    connection: input.connection,
    txOverrides: txOverrides,
  });
}

export function sendToken(input: Input_sendToken): Ethereum_TxReceipt {
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
    connection: input.connection,
    txOverrides: input.txOverrides,
  }).unwrap();

  return res;
}

export function approve(input: Input_approve): Ethereum_TxReceipt {
  const res = Ethereum_Mutation.callContractMethodAndWait({
    address: input.tokenAddress, //tokenAddress
    method: "function approve(address spender, uint256 amount)",
    args: [input.gatewayAddress, input.amount.toString()], // spender = gateway address
    connection: input.connection,
    txOverrides: input.txOverrides,
  }).unwrap();

  return res;
}
