import El from './el.js'

export default class Player {
  constructor() {
    this.videoId = 'video'
    this.player = videojs(this.videoId, {fluid: true})
    this.$loading = new El('loading')
    this.$videoContainer = new El('video-container')
  }

  // player proxy
  on(eventName, callback) {
    this.player.on(eventName, callback)
  }

  play(url) {
    console.log('play', url)
    this.client = new WebTorrent() // client is destroyed on stop
    this.client.add(url, (torrent) => {
      // console.log('----- Client is downloading:', torrent)

      let poster = torrent.files.filter((file) => {
        return /^poster\.(jpg|png|gif)$/.test(file.name)
      })[0]
      if (poster) {
        console.log('--- set poster:', poster)
        this.player.poster(poster)
      }

      torrent.files.forEach(function (file) {
        file.renderTo('#video_html5_api')
      })

      // avoid player controls flashing
      setTimeout(() => {
        this.$videoContainer.show()
      }, 1000)
    })
  }

  close() {
    this.$videoContainer.hide()
    this.player.pause()
    this.client.destroy()
  }
}
