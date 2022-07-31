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
import * as Types from "../..";

export class Args_getLinkEvent {
  roomId: string;
}

export function serializegetLinkEventArgs(args: Args_getLinkEvent): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getLinkEvent");
  const sizer = new WriteSizer(sizerContext);
  writegetLinkEventArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getLinkEvent");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetLinkEventArgs(encoder, args);
  return buffer;
}

export function writegetLinkEventArgs(
  writer: Write,
  args: Args_getLinkEvent
): void {
  writer.writeMapLength(1);
  writer.context().push("roomId", "string", "writing property");
  writer.writeString("roomId");
  writer.writeString(args.roomId);
  writer.context().pop();
}

export function deserializegetLinkEventResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: getLinkEvent");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getLinkEvent", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_getTraceId {
}

export function serializegetTraceIdArgs(args: Args_getTraceId): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getTraceId");
  const sizer = new WriteSizer(sizerContext);
  writegetTraceIdArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getTraceId");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetTraceIdArgs(encoder, args);
  return buffer;
}

export function writegetTraceIdArgs(
  writer: Write,
  args: Args_getTraceId
): void {
  writer.writeMapLength(0);
}

export function deserializegetTraceIdResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: getTraceId");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getTraceId", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_getConfig {
}

export function serializegetConfigArgs(args: Args_getConfig): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getConfig");
  const sizer = new WriteSizer(sizerContext);
  writegetConfigArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getConfig");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetConfigArgs(encoder, args);
  return buffer;
}

export function writegetConfigArgs(
  writer: Write,
  args: Args_getConfig
): void {
  writer.writeMapLength(0);
}

export function deserializegetConfigResult(buffer: ArrayBuffer): Types.Axelar_EnvironmentConfig {
  const context: Context = new Context("Deserializing imported module-type: getConfig");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getConfig", "Types.Axelar_EnvironmentConfig", "reading function output");
  const object = Types.Axelar_EnvironmentConfig.read(reader);
  const res: Types.Axelar_EnvironmentConfig =  object;
  reader.context().pop();

  return res;
}
