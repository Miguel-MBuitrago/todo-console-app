const Task = require('./task')

class Tasks {
  get tasksAsArray () {
    const taskskArr = []

    Object.keys(this._list).forEach(key => {
      const task = this._list[key]
      taskskArr.push(task)
    })

    return taskskArr
  }

  constructor () {
    this._list = {}
  }

  createTask (desc = '') {
    const task = new Task(desc)
    this._list[task.id] = task
  }

  deleteTask (id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }

  listTasks (task = this.tasksAsArray) {
    task.forEach((task, index) => {
      const idx = `${index + 1}`.yellow
      const { desc, completedDate } = task
      const state = completedDate
        ? `${completedDate}`.green
        : 'pending'.red

      console.log(`${idx}. ${desc} :: ${state}`)
    })
  }

  listCompletedPendingTasks (completed = true) {
    const tasks = completed
      ? this.tasksAsArray.filter(task => Boolean(task.completedDate))
      : this.tasksAsArray.filter(task => Boolean(!task.completedDate))

    this.listTasks(tasks)
  }

  toggleCompleted (ids = []) {
    ids.forEach(id => {
      const tarea = this._list[id]
      tarea.completedDate ??= new Date().toISOString()
    })

    this.tasksAsArray.forEach(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedDate = null
      }
    })
  }
}

module.exports = Tasks
