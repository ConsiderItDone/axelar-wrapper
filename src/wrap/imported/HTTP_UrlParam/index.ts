import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeHTTP_UrlParam,
  deserializeHTTP_UrlParam,
  writeHTTP_UrlParam,
  readHTTP_UrlParam
} from "./serialization";
import * as Types from "../..";

export class HTTP_UrlParam {

  public static uri: string = "wrap://ens/http.polywrap.eth";

  key: string;
  value: string;

  static toBuffer(type: HTTP_UrlParam): ArrayBuffer {
    return serializeHTTP_UrlParam(type);
  }

  static fromBuffer(buffer: ArrayBuffer): HTTP_UrlParam {
    return deserializeHTTP_UrlParam(buffer);
  }

  static write(writer: Write, type: HTTP_UrlParam): void {
    writeHTTP_UrlParam(writer, type);
  }

  static read(reader: Read): HTTP_UrlParam {
    return readHTTP_UrlParam(reader);
  }
}
