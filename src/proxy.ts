import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const pendingCookies: Array<{ name: string; value: string; options?: any }> = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            pendingCookies.push({ name, value, options })
            try {
              response.cookies.set(name, value, options)
            } catch {
              // ignore when not available
            }
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/admin/login/')
    ) {
      // If already authenticated, redirect away from the login page to admin
      if (user) {
        const redirectParam = request.nextUrl.searchParams.get('redirect')
        const target = redirectParam || '/admin'
        const redirectUrl = new URL(target, request.url)
        const redirectResponse = NextResponse.redirect(redirectUrl)
        pendingCookies.forEach(({ name, value, options }) =>
          redirectResponse.cookies.set(name, value, options)
        )
        redirectResponse.headers.set('x-orionatech-proxy', '1')
        return redirectResponse
      }
      // allow the login page to render
    } else if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)

      const redirectResponse = NextResponse.redirect(redirectUrl)
      pendingCookies.forEach(({ name, value, options }) =>
        redirectResponse.cookies.set(name, value, options)
      )
      redirectResponse.headers.set('x-orionatech-proxy', '1')
      return redirectResponse
    }
  }

  // If on login path and already authenticated, redirect to admin
  const isLoginPath =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/admin/login'

  if (isLoginPath && user) {
    const redirectParam = request.nextUrl.searchParams.get('redirect')
    const target = redirectParam || '/admin'
    const redirectUrl = new URL(target, request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    pendingCookies.forEach(({ name, value, options }) =>
      redirectResponse.cookies.set(name, value, options)
    )
    redirectResponse.headers.set('x-orionatech-proxy', '1')
    return redirectResponse
  }

  response.headers.set('x-orionatech-proxy', '1')
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
