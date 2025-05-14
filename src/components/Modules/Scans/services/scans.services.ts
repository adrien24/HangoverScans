// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://ajtyenefvkagyajggfrv.supabase.co'
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

export const getAllScans = async (id: string, scans: string) => {
  // const { data: OnePiece, error } = await supabase.from(scans).select('*').eq('id', id).single()
  // if (error) {
  //   console.error('Error fetching chapters:', error)
  //   return []
  // }

  const response = await fetch('https://ajtyenefvkagyajggfrv.functions.supabase.co/get-scans', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY,
      'X-Page-Id': id,
    },
  })

  const result = await response.json()
  return result.data
}
