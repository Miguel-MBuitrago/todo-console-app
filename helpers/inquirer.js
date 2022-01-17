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
        name: `${'0.'.yellow} Exit`
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

  console.log('\n')
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

module.exports = { inquirerMenu, pause, readInput }
