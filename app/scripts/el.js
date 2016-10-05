export default class El {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.getElementById(element)
    }

    this.$el = element
  }

  get() {
    return this.$el
  }

  show() {
    this.$el.style.display = 'block'
    return this
  }

  hide() {
    this.$el.style.display = 'none'
    return this
  }

  focus() {
    this.$el.focus()
    return this
  }
}
