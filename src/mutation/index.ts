import { getGatewayContractAddress } from "../utils/contractAddress";
import {
  Ethereum_Mutation,
  // Input_sendToken,
  // Input_approve,
  Input_approveAndSendToken,
  requireEnv,
} from "./w3";


export function approveAndSendToken(input: Input_approveAndSendToken ): String {
  const env = requireEnv();
  const chainId = env.chainId;

  const contractAddress = getGatewayContractAddress(chainId);

  const res = Ethereum_Mutation.callContractMethod({
    address: contractAddress,
    method: "function approve(address spender, uint256 amount)",
    args: [input.destinationChain, input.amount.toString()],
    connection: null,
    txOverrides: null,
  });
  if(res.isOk) {
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
  throw Error;
}
// export function sendToken(input: Input_sendToken): string {
//   const env = requireEnv();
//   const chainId = env.chainId;

//   const contractAddress = getGatewayContractAddress(chainId);

//   const res = Ethereum_Mutation.callContractMethod({
//     address: contractAddress,
//     method:
//       "function sendToken(string destinationChain, string destinationAddress, string symbol, uint256 amount)", //"function sendToken(string memory destinationChain, string memory destinationAddress, string memory symbol, uint256 amount)"
//     args: [
//       input.destinationChain,
//       input.destinationAddress,
//       input.symbol,
//       input.amount.toString(),
//     ],
//     connection: null,
//     txOverrides: null,
//   }).unwrap();

//   return res.data;
// }

// export function approve(input: Input_approve): boolean {
//   const env = requireEnv();
//   const chainId = env.chainId;

//   const contractAddress = getGatewayContractAddress(chainId);

//   const res = Ethereum_Mutation.callContractMethod({
//     address: contractAddress,
//     method: "function approve(address spender, uint256 amount)",
//     args: [input.spender, input.amount.toString()],
//     connection: null,
//     txOverrides: null,
//   });

//   return res.isOk;
// }
