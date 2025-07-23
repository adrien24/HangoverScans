// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://ajtyenefvkagyajggfrv.supabase.co'
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

export const getAllScans = async (id: string, title: string) => {
  const response = await fetch('https://ajtyenefvkagyajggfrv.functions.supabase.co/get-scans', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY,
      'X-Page-Id': id,
      'X-Scan-Title': title,
    },
  })

  const result = await response.json()
  console.log('getAllScans result:', id, title)

  return result.data
}
