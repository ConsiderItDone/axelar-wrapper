import { HTTP_Header } from "../query/w3";
//import uuid from "as-uuid";

export function getHeaders(
  publicAddr: string,
  signature: string,
  otc: string
): HTTP_Header[] {
  return [
    {
      key: "Content-Type",
      value: "application/json",
    },
    {
      key: "x-traceId",
      value: "", //uuid(), TODO
    },
    {
      key: "publicAddress",
      value: publicAddr,
    },
    {
      key: "signature",
      value: signature,
    },
    {
      key: "otc",
      value: otc,
    },
  ];
}
