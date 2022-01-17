const inquirer = require('inquirer')
require('colors')

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'Choose an option: ',
    choices: [
      {
        value: 1,
        name: `${'1.'.yellow} Create task`
      },
      {
        value: 2,
        name: `${'2.'.yellow} List tasks`
      },
      {
        value: 3,
        name: `${'3.'.yellow} List completed tasks`
      },
      {
        value: 4,
        name: `${'4.'.yellow} List pending task(s)`
      },
      {
        value: 5,
        name: `${'5.'.yellow} Complete task(s)`
      },
      {
        value: 6,
        name: `${'6.'.yellow} Delete task`
      },
      {
        value: 0,
        name: 'Exit'.brightBlue
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('====================='.green)
  console.log('    TODO List App'.yellow)
  console.log('=====================\n'.green)

  const { option } = await inquirer.prompt(questions)

  return option
}

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'enter'.green} to continue`
    }
  ]

  console.log()
  await inquirer.prompt(question)
}

async function readInput (message) {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        return value.length
          ? true
          : 'Please enter a value'
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}

async function deleteTasksList (tasks) {
  const choices = tasks.map((task, index) => {
    const { id, desc } = task
    const idx = `${index}.`.yellow
    return {
      value: id,
      name: `${idx} ${desc}`
    }
  })

  choices.push({
    value: 0,
    name: 'go back'.brightBlue
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete:',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id
}

async function completeTasksList (tasks) {
  const choices = tasks.map((task, index) => {
    const { id, desc } = task
    const idx = `${index}.`.yellow
    return {
      value: id,
      name: `${idx} ${desc}`,
      checked: Boolean(task.completedDate)
    }
  })

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select:',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question)
  return ids
}

async function confirm (message) {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

module.exports = { inquirerMenu, pause, readInput, deleteTasksList, confirm, completeTasksList }
