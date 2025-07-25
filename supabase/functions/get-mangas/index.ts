import { serve } from 'https://deno.land/std/http/server.ts'
import { setupHeaders, supabase } from '../supabaseClient.ts'

serve(async (req) => {
  const { headers } = setupHeaders(req)

  const query = supabase.from('Mangas').select()

  const { data, error } = await query

  return new Response(JSON.stringify({ data, error }), {
    headers,
  })
})
