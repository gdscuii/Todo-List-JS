const todoInput = document.getElementById('todoInput');
const todoForm = document.getElementById('todoForm');
let todos = [
  {
    id: 'asdlk',
    value: 'Ngerjain Skripsi',
    isDone: false,
  },
  {
    id: 'jhklw',
    value: 'Belajar',
    isDone: false,
  }
];

todoForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (todoInput.value === '') return;

  const todo = todoInput.value;
  const newTodos = [
    ...todos,
    {
      id: makeId(5),
      value: todo,
      isDone: false,
    }
  ]
  setTodos(newTodos);

  todoInput.value = '';
});

const setTodos = (newTodos) => {
  todos = newTodos;
  renderTodos(todos);
}

const renderTodos = (newTodos) => {
  let render = '';
  for(let i = 0; i < newTodos.length; i++) {
    render += todoItemTemplate(newTodos[i]);
  }
  const todosContainer = document.getElementById('todosContainer');
  todosContainer.innerHTML = render;
}

const toggleTodo = (todoId) => {
  const newTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      newTodos.push({
        id: todos[i].id,
        value: todos[i].value,
        isDone: !todos[i].isDone,
      });
    } else {
      newTodos.push(todos[i]);
    }
  }
  setTodos(newTodos);
}

const deleteTodo = (todoId) => {
  const newTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== todoId) {
      newTodos.push(todos[i]);
    }
  }
  setTodos(newTodos);
}

const todoItemTemplate = (todo) => (
  `<li>
    <label for="${todo.id}">
      <input id="${todo.id}" class="todoCheckbox" type="checkbox" onclick="toggleTodo('${todo.id}')" ${todo.isDone ? 'checked' : ''}>
      <span class="${todo.isDone ? 'checked' : ''}">${todo.value}</span>
    </label>
    <button class="delete-button" aria-label="Delete Todo" onclick="deleteTodo('${todo.id}')">✖</button>
  </li>`
);

function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


renderTodos(todos);