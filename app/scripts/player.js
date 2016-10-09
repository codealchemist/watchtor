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
    this.showStatsTimeout;
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

      let videoFile;
      let descriptionFile;
      let posterFile;
      torrent.files.forEach((file) => {
        // video
        if (this.isVideoFile(file)) {
          videoFile = file
          return
        }

        // txt
        if (this.isTextFile(file)) {
          descriptionFile = file
          file.getBlobURL((err, url) => {
            this.getBlob(url)
              .then((data) => {
                console.group(`--- ${file.name}:`)
                console.log(data)
                console.groupEnd()
              })
          })
          return
        }

        // image
        if (this.isImageFile(file)) {
          posterFile
          return
        }
      })

      if (posterFile) {
        console.log('--- set poster:', posterFile)
        this.player.poster(posterFile)
      }

      // send to player
      videoFile.renderTo('#video_html5_api')

      // display stats
      this.showStats()
    })
  }

  show () {
    this.$videoContainer.show()
  }

  isVideoFile (file) {
    return /\.(avi|mp4|mpeg4|mpeg|mpg|mkv|mov|asf|wmv|264|h264|webm|ogv|mjpeg|xvid|m4v|ts)$/.test(file.name)
  }

  isImageFile (file) {
    return /\.(jpg|png|gif)$/.test(file.name)
  }

  isTextFile (file) {
    return /\.(txt)$/.test(file.name)
  }

  ifPosterFile (file) {
    return /^poster\.(jpg|png|gif)$/.test(file.name)
  }

  getBlob (url) {
    let promise = fetch(url)
    return promise.then(
      (response) => response.text(),
      (error) => error
    )
  }

  close() {
    this.$videoContainer.hide()
    this.player.pause()
    this.client.destroy()
    clearInterval(this.interval)
    this.$stats.hide()
    clearTimeout(this.showStatsTimeout)
  }

  showStats() {
    this.showStatsTimeout = setTimeout(() => {
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
