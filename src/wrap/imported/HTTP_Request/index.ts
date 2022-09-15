import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeHTTP_Request,
  deserializeHTTP_Request,
  writeHTTP_Request,
  readHTTP_Request
} from "./serialization";
import * as Types from "../..";

export class HTTP_Request {

  public static uri: string = "wrap://ens/http.polywrap.eth";

  headers: Array<Types.HTTP_Header> | null;
  urlParams: Array<Types.HTTP_UrlParam> | null;
  responseType: Types.HTTP_ResponseType;
  body: string | null;

  static toBuffer(type: HTTP_Request): ArrayBuffer {
    return serializeHTTP_Request(type);
  }

  static fromBuffer(buffer: ArrayBuffer): HTTP_Request {
    return deserializeHTTP_Request(buffer);
  }

  static write(writer: Write, type: HTTP_Request): void {
    writeHTTP_Request(writer, type);
  }

  static read(reader: Read): HTTP_Request {
    return readHTTP_Request(reader);
  }
}
