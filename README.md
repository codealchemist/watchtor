# watchtor
Watch torrents online.

Watchtor provides a minimalistic approach to online torrent watching.

You'll be received by a big input where you can paste magnet links and that's it.

Inmediately after pasting a magnet link Watchtor will try to stream your video.

Pressing the ESC key will cancel / close the video and you'll get the input again.

After pasting a magnet link you'll get a short url in the address bar you can use to directly access / share the current video.

### Try It

[Play Sintel on Watchtor](https://watchtor.herokuapp.com/YZksya)

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

Watchtor uses the popular [WebTorrent](https://github.com/feross/webtorrent) client at its core to do torrent streaming.
If you haven't heard about it before, you should check it out now!

### Thanks!

Thanks for passing by!
Hope you enjoy playing with Watchtor!
