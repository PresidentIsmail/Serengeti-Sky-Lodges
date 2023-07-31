//  route handler for the auth callback
// This code creates a route handler client that uses cookies from the request to authenticate the user.

/* 
Managing sign-in with Code Exchange#
The Next.js Auth Helpers are configured to use the server-side auth flow to sign users into your application. This requires you to setup a Code Exchange route, to exchange an auth code for the user's session, which is set as a cookie for future requests made to Supabase
*/

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestURL.origin);
}


