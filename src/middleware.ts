import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Crear respuesta
  const response = NextResponse.next();

  // Headers de seguridad adicionales
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Detectar si estamos en desarrollo
  const isDevelopment = process.env.NODE_ENV === "development";

  // URLs permitidas para connect-src
  const connectSrcUrls = [
    "'self'",
    "https://api.openai.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ];

  // En desarrollo, agregar localhost para API externo
  if (isDevelopment) {
    connectSrcUrls.push("http://localhost:3001", "http://127.0.0.1:3001");
  }

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.openai.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      `connect-src ${connectSrcUrls.join(" ")}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  // HSTS (HTTPS Strict Transport Security)
  if (request.nextUrl.protocol === "https:") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // Permissions Policy
  response.headers.set(
    "Permissions-Policy",
    ["camera=()", "microphone=()", "geolocation=()", "interest-cohort=()"].join(
      ", "
    )
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
