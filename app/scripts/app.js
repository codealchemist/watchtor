import Player from './player.js'
import UrlShortener from './url-shortener.js'
import El from './el.js'

export default class App {
  constructor() {
    this.player = new Player()
    this.shortener = new UrlShortener()
    this.$magnetLinkInput = new El('magnetLink')
    this.$loading = new El('loading')

    this.setDefaults()
    this.setEvents()

    this.autoloadMagnetLink()
  }

  setDefaults() {
    alertify.defaults.glossary.title = 'watchtor' // default alert title
  }

  autoloadMagnetLink() {
    if (location.pathname !== '/magnet/magnet:') return false

    let url = location.href
    let baseUrl = `${location.origin}/magnet/`
    let magnetLink = url.replace(baseUrl, '')
    if (!this.isMagnetLink(magnetLink)) {
      alertify.error('Invalid magnet link!')
      return
    }

    // load it!
    this.loadMagnetLink(magnetLink)
  }

  loadMagnetLink(magnetLink) {
    // prepare ui and play it!
    this.$magnetLinkInput.hide()
    this.$loading.show()
    this.player.play(magnetLink)

    // get a short url and set it
    // prettier sharing ;)
    this.shortener
      .create(magnetLink)
      .shorten()
      .set()
  }

  setEvents() {
    // magnet link pasted
    bean.on(this.$magnetLinkInput.get(), 'paste', (e) => {
      let magnetLink = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste here...')
      if (!this.isMagnetLink(magnetLink)) {
        alertify.error('Invalid magnet link!')
        return
      }

      this.loadMagnetLink(magnetLink)
    })

    // close player on esc
    bean.on(document, 'keyup', (e) => {
      if (e.keyCode === 27) {
        this.player.close()
        this.$loading.hide()
        this.$magnetLinkInput.show().focus()
      }
    })

    // player event to hide loading when playback is about to start
    this.player.on('loadeddata', () => {
      this.$loading.hide()
    })
  }

  isMagnetLink(value) {
    return value.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) != null
  }
}
