import Config from './config.js'

export default class UrlShortener {
  constructor() {
    let key = ''
    this.config = new Config()
    this.serviceUrl = `https://www.googleapis.com/urlshortener/v1/url?fields=id&key=${key}`
    this.baseUrl = this.config.get('baseUrl')
    this.shortBaseUrl = this.config.get('shortBaseUrl')
    this.promise = null
    this.url = null
  }

  create(magnetLink) {
    this.url = `${this.baseUrl}/magnet/${magnetLink}`
    return this
  }

  shorten(url) {
    url = url || this.url
    console.log('- shorten url:', url)
    let payload = JSON.stringify({
      longUrl: url
    })

    this.promise = fetch(this.serviceUrl, {
      method: 'POST',
      body: payload,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    return this
  }

  set(url) {
    if (!url) return this.promise.then(
      (response) => this.onShortenOk(response),
      (error) => this.onShortenError(error)
    )
    history.pushState({}, document.title, url)
  }

  onShortenOk(response) {
    response
      .json()
      .then((data) => {
        console.log('- SHORT URL:', data.id)
        let shortId = data.id.replace(this.shortBaseUrl, '') // remove shortener service base url
        let newUrl = `${this.baseUrl}/${shortId}`

        this.set(newUrl)
      })
  }

  onShortenError(response) {
    console.log('- shorten error:', response)
  }

  getPromise() {
    return this.promise
  }
}
