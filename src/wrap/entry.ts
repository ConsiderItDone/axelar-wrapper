import {
  wrap_invoke_args,
  wrap_invoke,
  wrap_abort,
  InvokeArgs
} from "@polywrap/wasm-as";

import {
  getDepositAddressWrapped,
  getOneTimeCodeWrapped,
  getInitRoomIdWrapped,
  approveAndSendTokenWrapped,
  approveWrapped,
  sendTokenWrapped
} from "./Module/wrapped";

export function _wrap_invoke(method_size: u32, args_size: u32, env_size: u32): bool {
  const args: InvokeArgs = wrap_invoke_args(
    method_size,
    args_size
  );

  if (args.method == "getDepositAddress") {
    return wrap_invoke(args, env_size, getDepositAddressWrapped);
  }
  else if (args.method == "getOneTimeCode") {
    return wrap_invoke(args, env_size, getOneTimeCodeWrapped);
  }
  else if (args.method == "getInitRoomId") {
    return wrap_invoke(args, env_size, getInitRoomIdWrapped);
  }
  else if (args.method == "approveAndSendToken") {
    return wrap_invoke(args, env_size, approveAndSendTokenWrapped);
  }
  else if (args.method == "approve") {
    return wrap_invoke(args, env_size, approveWrapped);
  }
  else if (args.method == "sendToken") {
    return wrap_invoke(args, env_size, sendTokenWrapped);
  }
  else {
    return wrap_invoke(args, env_size, null);
  }
}

export function wrapAbort(
  msg: string | null,
  file: string | null,
  line: u32,
  column: u32
): void {
  wrap_abort(
    msg ? msg : "",
    file ? file : "",
    line,
    column
  );
}
