import nock from 'nock'

const nocked = (
  method: string,
  status: number,
  baseApiUrl: string,
  responseBody?: any,
  partialUrl?: string
) => {
  if (method === 'GET') {
    if (status === 200) {
      //console.log('nocked 200')
      return nock(baseApiUrl)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'Content-Type': 'application/json',
          'access-control-allow-credentials': 'true'
        })
        .get(partialUrl || '/')
        .reply(status, responseBody)
    } else if (status === 404) {
      //console.log('nocked 404')
      return nock(baseApiUrl)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'Content-Type': 'application/json',
          'access-control-allow-credentials': 'true'
        })
        .get(partialUrl || '/')
        .reply(status)
    }
  }
}

export default nocked
