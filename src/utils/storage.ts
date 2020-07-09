export const sNickname = {
  key: 'nn',
  set(value: string) {
    localStorage.setItem(this.key, value)
  },
  get() {
    return localStorage.getItem(this.key)
  },
  remove() {
    return localStorage.removeItem(this.key)
  }
}

export const sToken = {
  key: 'TK',
  set(value: string) {
    localStorage.setItem(this.key, value)
  },
  get() {
    return localStorage.getItem(this.key)
  },
  remove() {
    return localStorage.removeItem(this.key)
  }
}