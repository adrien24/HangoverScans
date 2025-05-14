import { serve } from 'https://deno.land/std/http/server.ts'
import { setupHeaders, supabase } from '../supabaseClient.ts'

serve(async (req) => {
  const { headers } = setupHeaders(req)

  const pageId = await req.headers.get('X-Page-Id')
  const id = parseInt(pageId)

  const { data, error } = await supabase.from('OnePiece').select('*').eq('id', id).single()

  return new Response(JSON.stringify({ data, error }), {
    headers: headers,
  })
})
