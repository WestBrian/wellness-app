export const customFetch = async <T = any>(path: string): Promise<T> => {
  const res = await fetch(path)
  return await res.json()
}
