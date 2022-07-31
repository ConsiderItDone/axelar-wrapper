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
import { OTCResponce } from "./";
import * as Types from "..";

export function serializeOTCResponce(type: OTCResponce): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) object-type: OTCResponce");
  const sizer = new WriteSizer(sizerContext);
  writeOTCResponce(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) object-type: OTCResponce");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeOTCResponce(encoder, type);
  return buffer;
}

export function writeOTCResponce(writer: Write, type: OTCResponce): void {
  writer.writeMapLength(2);
  writer.context().push("otc", "string", "writing property");
  writer.writeString("otc");
  writer.writeString(type.otc);
  writer.context().pop();
  writer.context().push("validationMsg", "string", "writing property");
  writer.writeString("validationMsg");
  writer.writeString(type.validationMsg);
  writer.context().pop();
}

export function deserializeOTCResponce(buffer: ArrayBuffer): OTCResponce {
  const context: Context = new Context("Deserializing object-type OTCResponce");
  const reader = new ReadDecoder(buffer, context);
  return readOTCResponce(reader);
}

export function readOTCResponce(reader: Read): OTCResponce {
  let numFields = reader.readMapLength();

  let _otc: string = "";
  let _otcSet: bool = false;
  let _validationMsg: string = "";
  let _validationMsgSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "otc") {
      reader.context().push(field, "string", "type found, reading property");
      _otc = reader.readString();
      _otcSet = true;
      reader.context().pop();
    }
    else if (field == "validationMsg") {
      reader.context().push(field, "string", "type found, reading property");
      _validationMsg = reader.readString();
      _validationMsgSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_otcSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'otc: String'"));
  }
  if (!_validationMsgSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'validationMsg: String'"));
  }

  return {
    otc: _otc,
    validationMsg: _validationMsg
  };
}
