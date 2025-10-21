import { NextRequest } from "next/server";
import { getAllowedOrigins } from "./get-allowed-origins";

export function corsCheck(request: NextRequest) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowedOrigins = getAllowedOrigins();

  // No origin header - check referer instead (for same-origin requests)
  if (!origin) {
    // If there's a referer, check if it's from an allowed domain
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        const isAllowed = allowedOrigins.some((allowed) => {
          const allowedUrl = new URL(allowed);
          return refererUrl.origin === allowedUrl.origin;
        });

        if (isAllowed) {
          return {
            allowed: true,
            origin: null, // Same-origin request doesn't need CORS headers
          };
        }
      } catch (e) {
        // Invalid referer URL
      }
    }

    // No origin and no valid referer = direct access, block it
    return {
      allowed: false,
      origin: null,
    };
  }

  // Check if origin is allowed
  const isAllowed = allowedOrigins.some((allowed) => {
    try {
      const allowedUrl = new URL(allowed);
      return origin === allowedUrl.origin;
    } catch {
      return origin === allowed;
    }
  });

  return {
    allowed: isAllowed,
    origin: isAllowed ? origin : null,
  };
}
