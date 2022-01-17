require('colors')

const { inquirerMenu, pause, readInput, deleteTasksList, confirm, completeTasksList } = require('./helpers/inquirer')
const Tasks = require('./models/tasks')
const { saveDB, readDB } = require('./db/saveFile')

const main = async () => {
  let opt
  const tasks = new Tasks()

  tasks._list = readDB()

  do {
    opt = await inquirerMenu()
    console.log()
    switch (opt) {
      case 1: {
        const desc = await readInput('Description:')
        tasks.createTask(desc)
        saveDB(tasks._list)
        break
      }
      case 2: {
        tasks.listTasks()
        await pause()
        break
      }
      case 3: {
        tasks.listCompletedPendingTasks()
        await pause()
        break
      }
      case 4: {
        await tasks.listCompletedPendingTasks(false)
        await pause()
        break
      }
      case 5: {
        const ids = await completeTasksList(tasks.tasksAsArray)
        tasks.toggleCompleted(ids)
        saveDB(tasks._list)
        break
      }
      case 6: {
        const id = await deleteTasksList(tasks.tasksAsArray)
        if (id !== 0) {
          const ok = await confirm('Want to delete?')
          if (ok) {
            tasks.deleteTask(id)
            saveDB(tasks._list)
          }
        }
        break
      }
      default: {
        break
      }
    }
  } while (opt !== 0)
  console.clear()
}

main()
