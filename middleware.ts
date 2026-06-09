import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/perfil", "/checkout"];
const ADMIN = ["/admin"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (PROTECTED.some((p) => path.startsWith(p)) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (ADMIN.some((p) => path.startsWith(p))) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    if (user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if ((path === "/login" || path === "/registro") && user) {
    return NextResponse.redirect(new URL("/perfil", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/perfil/:path*", "/checkout/:path*", "/login", "/registro", "/admin", "/admin/:path*"],
};
