export const parseResponse = async (response: any) => {
  const json = response.json()
  return json
}

export default parseResponse
