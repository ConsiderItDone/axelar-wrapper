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

export class Args_get {
  url: string;
  request: Types.HTTP_Request | null;
}

export function serializegetArgs(args: Args_get): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: get");
  const sizer = new WriteSizer(sizerContext);
  writegetArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: get");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetArgs(encoder, args);
  return buffer;
}

export function writegetArgs(
  writer: Write,
  args: Args_get
): void {
  writer.writeMapLength(2);
  writer.context().push("url", "string", "writing property");
  writer.writeString("url");
  writer.writeString(args.url);
  writer.context().pop();
  writer.context().push("request", "Types.HTTP_Request | null", "writing property");
  writer.writeString("request");
  if (args.request) {
    Types.HTTP_Request.write(writer, args.request as Types.HTTP_Request);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function deserializegetResult(buffer: ArrayBuffer): Types.HTTP_Response | null {
  const context: Context = new Context("Deserializing imported module-type: get");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("get", "Types.HTTP_Response | null", "reading function output");
  let object: Types.HTTP_Response | null = null;
  if (!reader.isNextNil()) {
    object = Types.HTTP_Response.read(reader);
  }
  const res: Types.HTTP_Response | null =  object;
  reader.context().pop();

  return res;
}

export class Args_post {
  url: string;
  request: Types.HTTP_Request | null;
}

export function serializepostArgs(args: Args_post): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: post");
  const sizer = new WriteSizer(sizerContext);
  writepostArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: post");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writepostArgs(encoder, args);
  return buffer;
}

export function writepostArgs(
  writer: Write,
  args: Args_post
): void {
  writer.writeMapLength(2);
  writer.context().push("url", "string", "writing property");
  writer.writeString("url");
  writer.writeString(args.url);
  writer.context().pop();
  writer.context().push("request", "Types.HTTP_Request | null", "writing property");
  writer.writeString("request");
  if (args.request) {
    Types.HTTP_Request.write(writer, args.request as Types.HTTP_Request);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function deserializepostResult(buffer: ArrayBuffer): Types.HTTP_Response | null {
  const context: Context = new Context("Deserializing imported module-type: post");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("post", "Types.HTTP_Response | null", "reading function output");
  let object: Types.HTTP_Response | null = null;
  if (!reader.isNextNil()) {
    object = Types.HTTP_Response.read(reader);
  }
  const res: Types.HTTP_Response | null =  object;
  reader.context().pop();

  return res;
}
