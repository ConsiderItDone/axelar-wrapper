import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeHTTP_Header,
  deserializeHTTP_Header,
  writeHTTP_Header,
  readHTTP_Header
} from "./serialization";
import * as Types from "../..";

export class HTTP_Header {

  public static uri: string = "wrap://ens/http.polywrap.eth";

  key: string;
  value: string;

  static toBuffer(type: HTTP_Header): ArrayBuffer {
    return serializeHTTP_Header(type);
  }

  static fromBuffer(buffer: ArrayBuffer): HTTP_Header {
    return deserializeHTTP_Header(buffer);
  }

  static write(writer: Write, type: HTTP_Header): void {
    writeHTTP_Header(writer, type);
  }

  static read(reader: Read): HTTP_Header {
    return readHTTP_Header(reader);
  }
}
