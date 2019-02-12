import axios from 'axios'

export default async (url, token, orgId) => {
  const httpOptions = {
    url: url,
    method: 'get',
    headers: {
      //      'x-org-id': orgId || undefined,
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const { data } = await axios(httpOptions)
    return data
  } catch (error) {
    throw error
  }
}
