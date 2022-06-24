import { HTTP_Header } from "../query/w3";
//import uuid from "as-uuid";

export function getHeaders(
  publicAddr: string,
  signature: string,
  otc: string,
  traceId: string
): HTTP_Header[] {
  return [
    {
      key: "Content-Type",
      value: "application/json",
    },
    {
      key: "x-traceId",
      value: traceId,
    },
    {
      key: "publicAddress",
      value: publicAddr,
    },
    {
      key: "User-Agent",
      value: "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
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
