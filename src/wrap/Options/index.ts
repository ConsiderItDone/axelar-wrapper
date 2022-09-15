import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeOptions,
  deserializeOptions,
  writeOptions,
  readOptions
} from "./serialization";
import * as Types from "..";

export class Options {
  _traceId: string;

  static toBuffer(type: Options): ArrayBuffer {
    return serializeOptions(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Options {
    return deserializeOptions(buffer);
  }

  static write(writer: Write, type: Options): void {
    writeOptions(writer, type);
  }

  static read(reader: Read): Options {
    return readOptions(reader);
  }
}
