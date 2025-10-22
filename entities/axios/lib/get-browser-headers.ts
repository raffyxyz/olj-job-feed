import "server-only";
import { NextRequest } from "next/server";

export const getBrowserHeaders = (request: NextRequest) => {
  const reqHeaders = request.headers;

  const browserHeaders = {
    "User-Agent": reqHeaders.get("user-agent"),
    Accept: reqHeaders.get("accept"),
    "Accept-Language": reqHeaders.get("accept-language"),
    "Accept-Encoding": reqHeaders.get("accept-encoding"),
    Referer: reqHeaders.get("referer"),
    "sec-ch-ua": reqHeaders.get("sec-ch-ua"),
    "sec-ch-ua-mobile": reqHeaders.get("sec-ch-ua-mobile"),
    "sec-ch-ua-platform": reqHeaders.get("sec-ch-ua-platform"),
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
  };

  return browserHeaders;
};
