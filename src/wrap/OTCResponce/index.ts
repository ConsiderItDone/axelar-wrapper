import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeOTCResponce,
  deserializeOTCResponce,
  writeOTCResponce,
  readOTCResponce
} from "./serialization";
import * as Types from "..";

export class OTCResponce {
  otc: string;
  validationMsg: string;

  static toBuffer(type: OTCResponce): ArrayBuffer {
    return serializeOTCResponce(type);
  }

  static fromBuffer(buffer: ArrayBuffer): OTCResponce {
    return deserializeOTCResponce(buffer);
  }

  static write(writer: Write, type: OTCResponce): void {
    writeOTCResponce(writer, type);
  }

  static read(reader: Read): OTCResponce {
    return readOTCResponce(reader);
  }
}
