const readline = require('readline');
const data = require('./data.js')


const COMPLETE_MARK = '✅';
const INCOMPLETE_MARK = '❌';

let todos = data.todos;
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const menu = `
Your options are:
1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.
6. Quit.
`

const displayMenu = () => {
  interface.question(menu, handleMenu);
}

const displayTodos = () => {
  console.clear();
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const num = i + 1;
    console.log(num + '. ' + todo.text + ' priority: ' + todo.priority + ' - ' + (todo.isComplete ? COMPLETE_MARK : INCOMPLETE_MARK));
  }
}

const add = (answer) => {
  const todo = {
    text: answer,
    priority: 2,
    isComplete: false,
  }

  todos.unshift(todo);
  displayTodos();
  displayMenu();
}

const remove = (num) => {
  todos.splice(num - 1, 1);
  displayTodos();
  displayMenu();
}

const toggleComplete = (num) => {
  // todos[num - 1].isComplete = (todos[num - 1].isComplete) ? false : true;
  const theTodo = todos[num - 1]
  if (theTodo.isComplete) {
    theTodo.isComplete = false
  } else {
    theTodo.isComplete = true
  }
  displayTodos();
  displayMenu();
}



const togglePriority = (num) => {
  const todo = todos[num - 1];
  // if(todo.priority === 1){
  //   todos.priority = 2
  // } else (todo.priority === 2)
  //   todos.priority = 1

  todos[num - 1].priority = (todos[num - 1].priority == 1) ? 2 : 1;

  displayTodos();
  displayMenu();

}

const removeCompletedTodos = () => {
  todos = todos.filter(function (todo) {
    return todo.isComplete === false;
  })

  displayTodos();
  displayMenu();

}


const handleMenu = (cmd) => {
  switch (cmd) {
    case '1':
      console.clear();
      interface.question('\nWhat should go on your list?\n\n', add)
      break;

    case '2':
      displayTodos();
      interface.question('\nType a number to pick a todo to remove: ', remove)
      break;

    case '3':
      removeCompletedTodos();
      break;

    case '4':
      displayTodos();
      interface.question('\nPlease pick a todo to check complete or incomplete: ', toggleComplete)
      break;

    case '5':
      displayTodos();
      interface.question('\nPlease pick a todo to toggle its priority: ', togglePriority)
      break;

    default:
      console.log('Quitting!');
      interface.close();
  }
}

displayTodos();
displayMenu();
