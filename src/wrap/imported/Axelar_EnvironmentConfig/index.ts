import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeAxelar_EnvironmentConfig,
  deserializeAxelar_EnvironmentConfig,
  writeAxelar_EnvironmentConfig,
  readAxelar_EnvironmentConfig
} from "./serialization";
import * as Types from "../..";

export class Axelar_EnvironmentConfig {

  public static uri: string = "wrap://ens/axelar.polywrap.eth";

  resourceUrl: string;
  axelarRpcUrl: string;
  axelarLcdUrl: string;
  axelarCachingServiceUrl: string;

  static toBuffer(type: Axelar_EnvironmentConfig): ArrayBuffer {
    return serializeAxelar_EnvironmentConfig(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Axelar_EnvironmentConfig {
    return deserializeAxelar_EnvironmentConfig(buffer);
  }

  static write(writer: Write, type: Axelar_EnvironmentConfig): void {
    writeAxelar_EnvironmentConfig(writer, type);
  }

  static read(reader: Read): Axelar_EnvironmentConfig {
    return readAxelar_EnvironmentConfig(reader);
  }
}
