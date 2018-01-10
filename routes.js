const blacklist = require('./blacklist')

const shortUrlHost = 'https://goo.gl'

module.exports = function routes(app) {
  // ignore favicon requests
  app.get('/favicon.ico', (req, res) => {
    res.send(null)
  })

  app.get('/', (req, res) => {
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
    if (blacklist[shortUrlId]) {
      console.info('-- BLOCKED blacklisted short url:', shortUrlId)
      res.render('index')
      return
    }

    let shortUrl = `${shortUrlHost}/${shortUrlId}`
    console.info(`-- redirect to short url: ${shortUrl}`)

    res.redirect(shortUrl)
  })
}
