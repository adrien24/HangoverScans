import { serve } from 'https://deno.land/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.1.79:5173',
  'https://hangover-scans.vercel.app/',
]

serve(async (req) => {
  const origin = req.headers.get('origin') ?? ''
  const method = req.method

  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Requête preflight
  if (method === 'OPTIONS') {
    console.log('Options')

    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  if (!isAllowedOrigin) {
    console.log(`Origin not Ok: ${origin}`)
    return new Response('Forbidden', { status: 403 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
  )

  const { data, error } = await supabase
    .from('OnePiece')
    .select('id, title')
    .order('id', { ascending: true })

  return new Response(JSON.stringify({ data, error }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
})
