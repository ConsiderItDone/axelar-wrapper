import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeHTTP_Response,
  deserializeHTTP_Response,
  writeHTTP_Response,
  readHTTP_Response
} from "./serialization";
import * as Types from "../..";

export class HTTP_Response {

  public static uri: string = "wrap://ens/http.polywrap.eth";

  status: i32;
  statusText: string;
  headers: Array<Types.HTTP_Header> | null;
  body: string | null;

  static toBuffer(type: HTTP_Response): ArrayBuffer {
    return serializeHTTP_Response(type);
  }

  static fromBuffer(buffer: ArrayBuffer): HTTP_Response {
    return deserializeHTTP_Response(buffer);
  }

  static write(writer: Write, type: HTTP_Response): void {
    writeHTTP_Response(writer, type);
  }

  static read(reader: Read): HTTP_Response {
    return readHTTP_Response(reader);
  }
}
