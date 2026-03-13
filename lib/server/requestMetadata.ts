type RequestMetadata = {
  ip: string;
  userAgent: string;
  referrer: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
};

function getFirstHeaderValue(headerValue: string | null) {
  return headerValue?.split(",")[0]?.trim() ?? "";
}

export function getRequestMetadata(request: Request): RequestMetadata {
  const ip =
    getFirstHeaderValue(request.headers.get("x-forwarded-for")) ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "";

  return {
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    referrer: request.headers.get("referer") ?? "",
    location: {
      city: request.headers.get("x-vercel-ip-city") ?? "",
      region: request.headers.get("x-vercel-ip-country-region") ?? "",
      country: request.headers.get("x-vercel-ip-country") ?? "",
    },
  };
}
