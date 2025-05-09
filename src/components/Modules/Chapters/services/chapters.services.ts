export const getAllChapters = async () => {
  const response = await fetch('https://ajtyenefvkagyajggfrv.functions.supabase.co/get-chapters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY,
    },
  })

  const result = await response.json()
  console.log(result.data)

  return result.data
}
