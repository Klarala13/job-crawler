class MailError extends Error {
  constructor ({name, message, stack}) {
    console.log("hey, I am MailError and I am here to catch all ur mistakes");
  
    super(...arguments)
    this.name = name
    this.message = message
    this.stack = stack
  }

  toJSON () {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      stack: this.stack
    })
  }

  static from (error) {
    return new MailError({
      name: error.name,
      message: error.message,
      stack: error.stack
    })
  }
}

module.exports = MailError