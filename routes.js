"use strict";

const requestify = require('requestify')
const shortUrlHost = 'https://goo.gl'
const ttl = 24 // hours
const origin = 'watchtor.herokuapp.com'

module.exports = function routes(app) {
  // ignore favicon requests
  app.get('/favicon.ico', (req, res) => {
    res.send(null)
  })

  app.get('/', (req, res) => {
    console.info('-- index')
    res.render('index')
  });

  app.get('/magnet/:magnetLink', (req, res) => {
    let magnetLink = req.url.replace('/magnet/', '')
    console.info('-- load magnet link')
    res.render('index')
  })

  // special routing to allow resolving of short urls
  app.get('/:shortUrlId', (req, res) => {
    let shortUrlId = req.params.shortUrlId
    let shortUrl = `${shortUrlHost}/${shortUrlId}`
    console.info(`resolve short url: ${shortUrl}`)

    requestify.request(shortUrl, {
      method: 'GET',
      cache: {
        cache: true,
        expires: 1000 * 60 * 60 * ttl // ms
      },
      headers: {
        origin: origin
      },
      dataType: 'json'
    })
    .then((response) => {
      let data = response.getBody()
      console.info('redirect to long url:', data)
      let longUrl = data.longUrl
      res.redirect(longUrl)
    })
    .fail((error) => {
      console.error('ERROR getting user:', error)
    })
  })
}
