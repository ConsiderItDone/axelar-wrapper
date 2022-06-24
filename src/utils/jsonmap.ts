import { JSON } from "@web3api/wasm-as";
import { OTCResponce } from "../query/w3/OTCResponce";

export function toOtc(input: JSON.Value): OTCResponce {
  const json = <JSON.Obj>input;
  return {
    otc: json.getString("otc")!.valueOf(),
    validationMsg: json.getString("validationMsg")!.valueOf(),
  };
}

export function toRoomId(input: JSON.Value): string {
  const json = <JSON.Obj>input;
  const roomIdValue = json.getObj("data")!.getString("roomId");
  if (roomIdValue != null) {
    return roomIdValue.valueOf();
  }
  return json.stringify();
}

export function toDepositAddress(input: JSON.Value): string {
  const json = <JSON.Obj>input;
  const depositAddress = json.getString("depositAddress")!.valueOf();
  return depositAddress;
}
