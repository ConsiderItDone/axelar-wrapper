import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeEthereum_EventNotification,
  deserializeEthereum_EventNotification,
  writeEthereum_EventNotification,
  readEthereum_EventNotification
} from "./serialization";
import * as Types from "../..";

export class Ethereum_EventNotification {

  public static uri: string = "wrap://ens/ethereum.polywrap.eth";

  data: string;
  address: string;
  log: Types.Ethereum_Log;

  static toBuffer(type: Ethereum_EventNotification): ArrayBuffer {
    return serializeEthereum_EventNotification(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ethereum_EventNotification {
    return deserializeEthereum_EventNotification(buffer);
  }

  static write(writer: Write, type: Ethereum_EventNotification): void {
    writeEthereum_EventNotification(writer, type);
  }

  static read(reader: Read): Ethereum_EventNotification {
    return readEthereum_EventNotification(reader);
  }
}