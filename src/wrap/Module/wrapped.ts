import { wrap_load_env } from "@polywrap/wasm-as";
import {
  getDepositAddress,
  getOneTimeCode,
  getInitRoomId,
  approveAndSendToken,
  approve,
  sendToken
} from "../../index";
import {
  deserializegetDepositAddressArgs,
  serializegetDepositAddressResult,
  deserializegetOneTimeCodeArgs,
  serializegetOneTimeCodeResult,
  deserializegetInitRoomIdArgs,
  serializegetInitRoomIdResult,
  deserializeapproveAndSendTokenArgs,
  serializeapproveAndSendTokenResult,
  deserializeapproveArgs,
  serializeapproveResult,
  deserializesendTokenArgs,
  serializesendTokenResult
} from "./serialization";
import * as Types from "..";

export function getDepositAddressWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializegetDepositAddressArgs(argsBuf);

  const result = getDepositAddress(
    {
      fromChain: args.fromChain,
      toChain: args.toChain,
      destinationAddress: args.destinationAddress,
      asset: args.asset,
      options: args.options
    }
  );
  return serializegetDepositAddressResult(result);
}

export function getOneTimeCodeWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializegetOneTimeCodeArgs(argsBuf);

  const result = getOneTimeCode(
    {
      signerAddress: args.signerAddress,
      traceId: args.traceId
    }
  );
  return serializegetOneTimeCodeResult(result);
}

export function getInitRoomIdWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializegetInitRoomIdArgs(argsBuf);

  const result = getInitRoomId(
    {
      fromChain: args.fromChain,
      toChain: args.toChain,
      destinationAddress: args.destinationAddress,
      asset: args.asset,
      publicAddress: args.publicAddress,
      signature: args.signature,
      oneTimeCode: args.oneTimeCode,
      traceId: args.traceId
    }
  );
  return serializegetInitRoomIdResult(result);
}

export function approveAndSendTokenWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializeapproveAndSendTokenArgs(argsBuf);

  const result = approveAndSendToken(
    {
      destinationChain: args.destinationChain,
      destinationAddress: args.destinationAddress,
      symbol: args.symbol,
      amount: args.amount,
      tokenAddress: args.tokenAddress,
      gatewayAddress: args.gatewayAddress,
      connection: args.connection,
      txOverrides: args.txOverrides
    }
  );
  return serializeapproveAndSendTokenResult(result);
}

export function approveWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializeapproveArgs(argsBuf);

  const result = approve(
    {
      tokenAddress: args.tokenAddress,
      amount: args.amount,
      gatewayAddress: args.gatewayAddress,
      connection: args.connection,
      txOverrides: args.txOverrides
    }
  );
  return serializeapproveResult(result);
}

export function sendTokenWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializesendTokenArgs(argsBuf);

  const result = sendToken(
    {
      destinationChain: args.destinationChain,
      destinationAddress: args.destinationAddress,
      symbol: args.symbol,
      amount: args.amount,
      gatewayAddress: args.gatewayAddress,
      connection: args.connection,
      txOverrides: args.txOverrides
    }
  );
  return serializesendTokenResult(result);
}
