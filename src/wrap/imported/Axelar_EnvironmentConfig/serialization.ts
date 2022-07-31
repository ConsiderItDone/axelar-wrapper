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
import { Axelar_EnvironmentConfig } from "./";
import * as Types from "../..";

export function serializeAxelar_EnvironmentConfig(type: Axelar_EnvironmentConfig): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Axelar_EnvironmentConfig");
  const sizer = new WriteSizer(sizerContext);
  writeAxelar_EnvironmentConfig(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Axelar_EnvironmentConfig");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeAxelar_EnvironmentConfig(encoder, type);
  return buffer;
}

export function writeAxelar_EnvironmentConfig(writer: Write, type: Axelar_EnvironmentConfig): void {
  writer.writeMapLength(4);
  writer.context().push("resourceUrl", "string", "writing property");
  writer.writeString("resourceUrl");
  writer.writeString(type.resourceUrl);
  writer.context().pop();
  writer.context().push("axelarRpcUrl", "string", "writing property");
  writer.writeString("axelarRpcUrl");
  writer.writeString(type.axelarRpcUrl);
  writer.context().pop();
  writer.context().push("axelarLcdUrl", "string", "writing property");
  writer.writeString("axelarLcdUrl");
  writer.writeString(type.axelarLcdUrl);
  writer.context().pop();
  writer.context().push("axelarCachingServiceUrl", "string", "writing property");
  writer.writeString("axelarCachingServiceUrl");
  writer.writeString(type.axelarCachingServiceUrl);
  writer.context().pop();
}

export function deserializeAxelar_EnvironmentConfig(buffer: ArrayBuffer): Axelar_EnvironmentConfig {
  const context: Context = new Context("Deserializing imported object-type Axelar_EnvironmentConfig");
  const reader = new ReadDecoder(buffer, context);
  return readAxelar_EnvironmentConfig(reader);
}

export function readAxelar_EnvironmentConfig(reader: Read): Axelar_EnvironmentConfig {
  let numFields = reader.readMapLength();

  let _resourceUrl: string = "";
  let _resourceUrlSet: bool = false;
  let _axelarRpcUrl: string = "";
  let _axelarRpcUrlSet: bool = false;
  let _axelarLcdUrl: string = "";
  let _axelarLcdUrlSet: bool = false;
  let _axelarCachingServiceUrl: string = "";
  let _axelarCachingServiceUrlSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "resourceUrl") {
      reader.context().push(field, "string", "type found, reading property");
      _resourceUrl = reader.readString();
      _resourceUrlSet = true;
      reader.context().pop();
    }
    else if (field == "axelarRpcUrl") {
      reader.context().push(field, "string", "type found, reading property");
      _axelarRpcUrl = reader.readString();
      _axelarRpcUrlSet = true;
      reader.context().pop();
    }
    else if (field == "axelarLcdUrl") {
      reader.context().push(field, "string", "type found, reading property");
      _axelarLcdUrl = reader.readString();
      _axelarLcdUrlSet = true;
      reader.context().pop();
    }
    else if (field == "axelarCachingServiceUrl") {
      reader.context().push(field, "string", "type found, reading property");
      _axelarCachingServiceUrl = reader.readString();
      _axelarCachingServiceUrlSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_resourceUrlSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'resourceUrl: String'"));
  }
  if (!_axelarRpcUrlSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'axelarRpcUrl: String'"));
  }
  if (!_axelarLcdUrlSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'axelarLcdUrl: String'"));
  }
  if (!_axelarCachingServiceUrlSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'axelarCachingServiceUrl: String'"));
  }

  return {
    resourceUrl: _resourceUrl,
    axelarRpcUrl: _axelarRpcUrl,
    axelarLcdUrl: _axelarLcdUrl,
    axelarCachingServiceUrl: _axelarCachingServiceUrl
  };
}
