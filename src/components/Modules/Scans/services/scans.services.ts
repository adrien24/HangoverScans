import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajtyenefvkagyajggfrv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const getAllScans = async (id: string, scans: string) => {
  const { data: OnePiece, error } = await supabase.from(scans).select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching chapters:', error)
    return []
  }

  return OnePiece
}
