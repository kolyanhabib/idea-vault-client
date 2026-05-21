

import { NextResponse } from "next/server";

import { auth } from "./lib/auth";

export async function proxy(request) {

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const pathname = request.nextUrl.pathname;

  const privateRoutes = ["/add-idea", "/my-ideas", "/my-interactions"];

  
  const isIdeaDetailsPrivate = pathname.startsWith("/ideas/");

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  
  if ((isPrivateRoute || isIdeaDetailsPrivate) && !session) {
    const redirectUrl = new URL("/login", request.url);

    
    redirectUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(redirectUrl);
  }

 
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-idea",
    "/add-idea/:path*",

    "/my-ideas",
    "/my-ideas/:path*",

    "/my-interactions",
    "/my-interactions/:path*",

    "/ideas/:path*",
  ],
};
