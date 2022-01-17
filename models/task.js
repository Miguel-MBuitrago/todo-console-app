const { v4: uuidv4 } = require('uuid')

class Task {
  constructor (desc) {
    this.id = uuidv4()
    this.desc = desc
    this.completedDate = null
  }
}

module.exports = Task
