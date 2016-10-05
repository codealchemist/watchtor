export default class Config {
  constructor() {
    let config = {
      'localhost': {
        baseUrl: 'http://localhost:9000',
        shortBaseUrl: 'https://goo.gl/'
      },

      'watchtor.herokuapp.com': {
        baseUrl: 'http://watchtor.herokuapp.com',
        shortBaseUrl: 'https://goo.gl/'
      }
    }

    let host = location.hostname
    if (!host in config) {
      console.log(`ERROR: create a config for host "${host}"`)
      return
    }

    this.config = config[host]
  }

  get(key) {
    if (key in this.config) return this.config[key]
    return null
  }
}
