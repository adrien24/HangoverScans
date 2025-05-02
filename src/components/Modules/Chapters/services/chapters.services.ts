import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajtyenefvkagyajggfrv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const getAllChapters = async () => {
  const { data: OnePiece, error } = await supabase
    .from('OnePiece')
    .select('*')
    .order('id', { ascending: true })
  if (error) {
    console.error('Error fetching chapters:', error)
    return []
  }

  return OnePiece
}
