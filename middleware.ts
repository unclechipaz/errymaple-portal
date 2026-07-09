import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Determine subdomain based on hostname prefix or custom domain
  let schoolSlug = "";
  if (hostname.startsWith("high.")) {
    schoolSlug = "high-school";
  } else if (hostname.startsWith("junior.")) {
    schoolSlug = "junior-school";
  } else if (
    hostname.startsWith("international.") || 
    hostname.includes("errymapleinternational.ac.zw")
  ) {
    schoolSlug = "international-school";
  }

  if (schoolSlug) {
    // If the path already has the school slug prefix (e.g. /high-school/...), don't double rewrite it
    if (url.pathname.startsWith(`/${schoolSlug}`)) {
      return NextResponse.next();
    }
    // Rewrite path to /schoolSlug/restOfPath internally
    url.pathname = `/${schoolSlug}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, favicon.ico, icon.png, apple-icon.png (public assets)
     */
    "/((?!api|_next/static|_next/image|images|documents|favicon.ico|icon.png|apple-icon.png).*)",
  ],
};
