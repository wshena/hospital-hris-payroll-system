// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ROLE_REDIRECT: Record<string, string> = {
  hrd_manager: "/admin/dashboard",
  finance_officer: "/finance/dashboard",
  manager: "/manager/dashboard",
  employee: "/employee/home",
};

const PROTECTED_PREFIXES: Record<string, string> = {
  "/admin": "hrd_manager",
  "/finance": "finance_officer",
  "/manager": "manager",
  "/employee": "employee",
};

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Biarkan request ke /auth/* dan aset publik lewat
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Buat Supabase server client untuk baca session
  let response = NextResponse.next({ request });

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
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belum login → redirect ke /auth/login
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Ambil role dari tabel profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role as string;

  // Kalau akses "/" → redirect ke dashboard role-nya
  if (pathname === "/") {
    const destination = ROLE_REDIRECT[role] ?? "/auth/login";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // Guard: cek prefix path vs role yang diizinkan
  for (const [prefix, allowedRole] of Object.entries(PROTECTED_PREFIXES)) {
    if (pathname.startsWith(prefix) && role !== allowedRole) {
      // Role salah → tendang ke dashboard miliknya sendiri
      const destination = ROLE_REDIRECT[role] ?? "/auth/login";
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Jalankan proxy di semua route kecuali file statis
    "/((?!_next/static|_next/image|.*\\..*|favicon.ico).*)",
  ],
};
