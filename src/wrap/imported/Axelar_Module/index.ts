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
  serializegetLinkEventArgs,
  deserializegetLinkEventResult,
  Args_getLinkEvent,
  serializegetTraceIdArgs,
  deserializegetTraceIdResult,
  Args_getTraceId,
  serializegetConfigArgs,
  deserializegetConfigResult,
  Args_getConfig
} from "./serialization";
import * as Types from "../..";

export class Axelar_Module {

  public static uri: string = "wrap://ens/axelar.polywrap.eth";

  public static getLinkEvent(
    args: Args_getLinkEvent
  ): Result<string, string> {
    const argsBuf = serializegetLinkEventArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/axelar.polywrap.eth",
      "getLinkEvent",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializegetLinkEventResult(result.unwrap())
    );
  }

  public static getTraceId(
    args: Args_getTraceId
  ): Result<string, string> {
    const argsBuf = serializegetTraceIdArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/axelar.polywrap.eth",
      "getTraceId",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializegetTraceIdResult(result.unwrap())
    );
  }

  public static getConfig(
    args: Args_getConfig
  ): Result<Types.Axelar_EnvironmentConfig, string> {
    const argsBuf = serializegetConfigArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/axelar.polywrap.eth",
      "getConfig",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Axelar_EnvironmentConfig, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Axelar_EnvironmentConfig, string>(
      deserializegetConfigResult(result.unwrap())
    );
  }
}
