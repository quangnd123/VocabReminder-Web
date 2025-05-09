// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { AuthResponse, User } from "@/types/type";

// Define the response type

export async function GET(req: NextRequest): Promise<NextResponse<AuthResponse>> {
  const extensionOrigin = `chrome-extension://${process.env.BROWSER_EXTENSION_EDGE_ID}`

  // Check the request's origin
  const requestOrigin = req.headers.get("origin");

  // CORS headers (only for the extension)
  const headers = new Headers({
    "Access-Control-Allow-Origin": extensionOrigin,
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  });

  // Deny requests from non-extension origins
  if (requestOrigin && requestOrigin !== extensionOrigin) {
    // return NextResponse.json(
    //   { status: "error", error: "Access denied: Origin not allowed" },
    //   { status: 403 }
    // );
  }

  try {
    const session = await auth();

    if (session?.user) {
      return NextResponse.json(
        {
          status: "success",
          data: session.user as User,
        },
        { headers }
      );
    }

    return NextResponse.json({ status: "error", error: "Not logged in." }, { headers });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json(
      { status: "error", error: errorMessage },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS preflight request for CORS
export async function OPTIONS(req: NextRequest) {
  const extensionOrigin = `chrome-extension://${process.env.BROWSER_EXTENSION_EDGE_ID}`

  const requestOrigin = req.headers.get("origin");

  // Deny preflight if origin doesn’t match
  if (requestOrigin && requestOrigin !== extensionOrigin) {
    // return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": extensionOrigin,
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}