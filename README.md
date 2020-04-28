<a href="https://www.buymeacoffee.com/codealchemist" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-black.png" alt="Buy Me A Coffee" width="150px"></a>

# Watchtor
Watch torrents online.

Watchtor provides a minimalistic approach to online torrent watching.

You'll be received by a big input where you can paste magnet links and that's it.

Immediately after pasting a magnet link Watchtor will try to stream your video.

Pressing the ESC key will cancel / close the video and you'll get the input again.

After pasting a magnet link you'll get a short url in the address bar you can use to directly access / share the current video.

### Try It

[Play Sintel on Watchtor](https://open-watchtor.hashbase.io/#magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F)

### Development

To launch the app, make code changes and get the browser being automatically refreshed run:

`gulp serve`

### Build

To create a new build in the `dist` folder run:

`gulp build`

### Prod Run

There's a minimal nodejs/express component used to launch the app in Heroku and to provide basic routes that handle short urls. The server starts with `node index.js` and uses the `dist` content.

To start a local server and try how the app would work after publishing to Heroku (or other platform) you can run:

`gulp build; node index.js`

### Short URLs

Watchtor uses Google's Shortner API to create short urls.
If you want to use this server you'll need to use your own service key.
You can get started here:
https://developers.google.com/url-shortener

### WebTorrent

Watchtor uses the popular [WebTorrent](https://github.com/webtorrent/webtorrent) client at its core to do torrent streaming.
If you haven't heard about it before, you should check it out now!

### Thanks!

Thanks for passing by!
Hope you enjoy playing with Watchtor!
