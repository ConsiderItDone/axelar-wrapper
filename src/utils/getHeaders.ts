import { HTTP_Header } from "../wrap";

export function getHeaders(traceId: string): HTTP_Header[] {
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
      key: "User-Agent",
      value: "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
    },
  ];
}
