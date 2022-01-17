require('colors')

const { inquirerMenu, pause, readInput } = require('./helpers/inquirer')
const Tasks = require('./models/tasks')
const { saveDB, readDB } = require('./db/saveFile')

const main = async () => {
  let opt = ''
  const tasks = new Tasks()

  tasks._list = readDB()

  do {
    opt = await inquirerMenu()
    console.log('\n')
    switch (opt) {
      case 1: {
        const desc = await readInput('Description:')
        tasks.createTask(desc)
        saveDB(tasks._list)
        break
      }
      case 2: {
        tasks.listTasks()
        break
      }
      default: {
        break
      }
    }
    await pause()
  } while (opt !== 0)
  console.clear()
}

main()
