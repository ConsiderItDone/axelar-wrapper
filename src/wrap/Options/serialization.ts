import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Option,
  BigInt,
  BigNumber,
  JSON,
  Context
} from "@polywrap/wasm-as";
import { Options } from "./";
import * as Types from "..";

export function serializeOptions(type: Options): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) object-type: Options");
  const sizer = new WriteSizer(sizerContext);
  writeOptions(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) object-type: Options");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeOptions(encoder, type);
  return buffer;
}

export function writeOptions(writer: Write, type: Options): void {
  writer.writeMapLength(1);
  writer.context().push("_traceId", "string", "writing property");
  writer.writeString("_traceId");
  writer.writeString(type._traceId);
  writer.context().pop();
}

export function deserializeOptions(buffer: ArrayBuffer): Options {
  const context: Context = new Context("Deserializing object-type Options");
  const reader = new ReadDecoder(buffer, context);
  return readOptions(reader);
}

export function readOptions(reader: Read): Options {
  let numFields = reader.readMapLength();

  let __traceId: string = "";
  let __traceIdSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "_traceId") {
      reader.context().push(field, "string", "type found, reading property");
      __traceId = reader.readString();
      __traceIdSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!__traceIdSet) {
    throw new Error(reader.context().printWithContext("Missing required property: '_traceId: String'"));
  }

  return {
    _traceId: __traceId
  };
}
