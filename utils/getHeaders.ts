import { randomUUID } from "crypto";
import { HTTP_Header } from "../query/w3";
import { AssetTransferObject } from "./types";

export function getHeaders(payload: AssetTransferObject): HTTP_Header[] {
  return [
    {
      key: "Content-Type",
      value: "application/json",
    },
    {
      key: "x-traceId",
      value: payload.transactionTraceId || randomUUID(),
    },
    {
      key: "publicAddress",
      value: payload.publicAddr,
    },
    {
      key: "signature",
      value: payload.signature,
    },
    {
      key: "otc",
      value: payload.otc,
    },
  ];
}
