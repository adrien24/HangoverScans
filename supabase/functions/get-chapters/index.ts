import { serve } from 'https://deno.land/std/http/server.ts'
import { setupHeaders, supabase } from '../supabaseClient.ts'

serve(async (req) => {
  const { headers } = setupHeaders(req)

  const { data, error } = await supabase
    .from('OnePiece')
    .select('id, title')
    .order('id', { ascending: true })

  return new Response(JSON.stringify({ data, error }), {
    headers: headers,
  })
})
