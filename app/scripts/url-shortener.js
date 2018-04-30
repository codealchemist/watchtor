export default class UrlShortener {
  constructor() {
    let key = ''
    this.serviceUrl = `https://www.googleapis.com/urlshortener/v1/url?fields=id&key=${key}`
    this.baseUrl = `${location.protocol}//${location.host}`
    this.shortBaseUrl = 'https://goo.gl/'
    this.promise = null
    this.url = null
  }

  create(magnetLink) {
    this.url = `${this.baseUrl}#${magnetLink}`
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
