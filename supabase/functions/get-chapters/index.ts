import { serve } from 'https://deno.land/std/http/server.ts'
import { setupHeaders, supabase } from '../supabaseClient.ts'

serve(async (req) => {
  const { headers } = setupHeaders(req)

  // On lit le corps JSON de la requête
  const { id } = await req.json().catch(() => ({}))

  const query = supabase
    .from('Scans')
    .select('chapter, title')
    .order('id', { ascending: true })
    .eq('scan_id', id)

  const { data, error } = await query

  return new Response(JSON.stringify({ data, error }), {
    headers,
  })
})
