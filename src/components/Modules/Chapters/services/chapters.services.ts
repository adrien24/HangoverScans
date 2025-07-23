export const getAllChapters = async (id?: number) => {
  const response = await fetch('https://ajtyenefvkagyajggfrv.functions.supabase.co/get-chapters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY,
    },
    body: JSON.stringify({ id: 'One Piece' }), // On envoie l'id dans le body
  })

  const result = await response.json()
  return result.data
}
