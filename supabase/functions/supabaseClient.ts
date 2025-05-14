import { createClient } from 'https://esm.sh/@supabase/supabase-js'

export const allowedOrigins = [
  'http://192.168.1.79:5173',
  'https://hangover-scans.vercel.app',
  'https://hangoverscans.fr',
  'https://adrienbouteiller.fr',
]

export const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
)

export const setupHeaders = (req: Request) => {
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  console.log(isAllowedOrigin ? 'Allowed' : 'Not Allowed', origin, allowedOrigins)

  const headersPreflight = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Page-Id',
    'Access-Control-Max-Age': '86400',
  }
  originAccessControl(req, isAllowedOrigin, origin, headersPreflight)
  return {
    headersPreflight,
    headers,
  }
}

export const originAccessControl = (
  req: Request,
  isAllowedOrigin: boolean,
  origin: string,
  headersPreflight: Record<string, string>,
) => {
  const method = req.method

  // Requête preflight
  if (method === 'OPTIONS') {
    console.log(`Preflight request from: ${origin}`)

    return new Response(null, {
      status: 204,
      headers: headersPreflight,
    })
  }
  console.log(isAllowedOrigin ? 'Allowed' : 'Not Allowed')
  if (!isAllowedOrigin) {
    console.log(`Origin not Ok: ${origin}`)
    return new Response('Forbidden', { status: 403 })
  }
}
