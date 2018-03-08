const baseUrl = 'https://beta.felleskomponent.no'

module.exports = {
  baseUrl,
  tokenUrl: 'https://namidp01.rogfk.no/nidp/oauth/nam/token',
  indexLinks: {
    person: baseUrl + '/administrasjon/personal/person',
    personalressurs: baseUrl + '/administrasjon/personal/personalressurs',
    personalressurskategori: baseUrl + '/administrasjon/kodeverk/personalressurskategori',
    arbeidsforhold: baseUrl + '/administrasjon/personal/arbeidsforhold'
  }
}
