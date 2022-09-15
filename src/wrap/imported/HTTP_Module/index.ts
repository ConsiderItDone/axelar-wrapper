import {
  wrap_subinvoke,
  wrap_subinvokeImplementation,
  Option,
  BigInt,
  BigNumber,
  JSON,
  Result
} from "@polywrap/wasm-as";
import {
  serializegetArgs,
  deserializegetResult,
  Args_get,
  serializepostArgs,
  deserializepostResult,
  Args_post
} from "./serialization";
import * as Types from "../..";

export class HTTP_Module {

  public static uri: string = "wrap://ens/http.polywrap.eth";

  public static get(
    args: Args_get
  ): Result<Types.HTTP_Response | null, string> {
    const argsBuf = serializegetArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/http.polywrap.eth",
      "get",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.HTTP_Response | null, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.HTTP_Response | null, string>(
      deserializegetResult(result.unwrap())
    );
  }

  public static post(
    args: Args_post
  ): Result<Types.HTTP_Response | null, string> {
    const argsBuf = serializepostArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/http.polywrap.eth",
      "post",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.HTTP_Response | null, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.HTTP_Response | null, string>(
      deserializepostResult(result.unwrap())
    );
  }
}
