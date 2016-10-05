import El from './el.js'

export default class Player {
  constructor() {
    this.videoId = 'video'
    this.player = videojs(this.videoId, {fluid: true})
    this.$videoContainer = new El('video-container')

    // status
    this.interval = null
    this.intervalSeconds = 3
    this.torrent = null
    this.$stats = new El('stats')
    this.$peers = new El('peers')
    this.$downloadSpeed = new El('downloadSpeed')
    this.$uploadSpeed = new El('uploadSpeed')
    this.$progress = new El('progress')
  }

  // player proxy
  on(eventName, callback) {
    this.player.on(eventName, callback)
  }

  play(url) {
    this.client = new WebTorrent() // client is destroyed on stop
    this.client.add(url, (torrent) => {
      // console.log('----- Client is downloading:', torrent)
      this.torrent = torrent

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

      this.showStats()
    })
  }

  close() {
    this.$videoContainer.hide()
    this.player.pause()
    this.client.destroy()
    clearInterval(this.interval)
    this.$stats.hide()
  }

  showStats() {
    setTimeout(() => {
      this.$stats.show()
    }, 1000 * this.intervalSeconds)

    this.interval = setInterval(() => {
      let stats = {
        downloadSpeed: filesize(this.client.downloadSpeed, {round: 0}),
        uploadSpeed: filesize(this.client.uploadSpeed, {round: 0}),
        progress: Math.round(this.client.progress * 100),
        downloaded: filesize(this.torrent.downloaded, {round: 0}),
        uploaded: filesize(this.torrent.uploaded, {round: 0}),
        peers: this.torrent.numPeers
      }
      // console.log('-- stats', stats)

      this.$peers.html(stats.peers)
      this.$uploadSpeed.html(stats.uploadSpeed)
      this.$downloadSpeed.html(stats.downloadSpeed)
      this.$progress.html(stats.progress)
    }, 1000 * this.intervalSeconds)
  }
}
