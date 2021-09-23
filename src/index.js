import { isComplete, checkboxEvent } from './completed';
import './style.css';

// Array data for todo list
let todoListData = [
  {
    index: 0,
    description: 'complete day 3 tasks on time',
    completed: false,
  },
  {
    index: 1,
    description: 'Read a book for at least 1 hour',
    completed: false,
  },
];

const createIndexes = () => {
  for (let idx = 0; idx < todoListData.length; idx++) { /* eslint-disable-line no-plusplus */
    todoListData[idx].index = idx;
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem('todo_list', JSON.stringify(todoListData));
};

const refreshPage = () => {
  window.location.reload();
};

const addToDo = (input) => {
  const dataObj = {
    index: todoListData.length,
    description: '',
    completed: false,
  };

  dataObj.description = input;
  todoListData.push(dataObj);
  saveToLocalStorage();
  refreshPage();
};

const component = () => {
  const todoContainer = document.querySelector('.todo-list-container');
  let element = document.createElement('li');
  element.className = 'todo-item';

  // Heading
  const heading = document.createElement('h2');
  heading.className = 'heading';
  heading.textContent = 'Today\'s To Do';
  element.appendChild(heading);

  const clear = document.createElement('button');
  clear.className = 'clear';
  clear.innerHTML = '<i class=\'sync alternate icon\'></i>';
  element.appendChild(clear);
  todoContainer.appendChild(element);

  clear.addEventListener('click', () => {
    todoListData.splice(0);
    saveToLocalStorage();
    refreshPage();
  });

  // Add todo item
  element = document.createElement('li');
  element.className = 'todo-item';

  const addItem = document.createElement('input');
  addItem.className = 'add-item';
  addItem.placeholder = 'Add to your list';
  addItem.value = '';
  element.appendChild(addItem);

  const enterButton = document.createElement('button');
  enterButton.className = 'enter-button';
  enterButton.innerHTML = '<i class=\'level down alternate icon\'></i>';
  element.appendChild(enterButton);
  todoContainer.appendChild(element);

  addItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addToDo(addItem.value);
    }
  });

  enterButton.addEventListener('click', () => {
    addToDo(addItem.value);
  });

  // Populate todo items
  if (todoListData.length !== 0) {
    todoListData.forEach((todo) => {
      element = document.createElement('li');
      element.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.checked = todo.completed;
      element.appendChild(checkbox);

      const description = document.createElement('textarea');
      description.className = 'description';
      description.rows = 'auto';
      description.value = todo.description.toLowerCase().charAt(0).toUpperCase();
      description.value += todo.description.slice(1);
      element.appendChild(description);

      const taskButton = document.createElement('button');
      taskButton.className = 'task-button';
      taskButton.innerHTML = '<i class=\'ellipsis vertical icon\'></i>';
      element.appendChild(taskButton);

      // TODO: This code is reserved for the next project task.
      // description.addEventListener('focus', (e) => {
      //   e.target.parentNode.style.background = '#ffff0080';
      //   e.target.parentNode.lastElementChild.innerHTML = `<i class="trash alternate icon"></i>`;
      // });

      // Handle checkbox change event
      checkboxEvent(checkbox, todo, saveToLocalStorage, refreshPage);
      isComplete(todo.completed, description);

      todoContainer.appendChild(element);
    });
  }

  // Clear completed button
  element = document.createElement('li');

  const clearCompleted = document.createElement('button');
  clearCompleted.className = 'clear-completed';
  clearCompleted.innerHTML = 'Clear all completed';
  element.appendChild(clearCompleted);
  todoContainer.appendChild(element);

  clearCompleted.addEventListener('click', () => {
    todoListData = todoListData.filter((todo) => todo.completed !== true);
    createIndexes();
    saveToLocalStorage();
    refreshPage();
  });
};

const loadPage = () => {
  window.onload = () => {
    if (localStorage.getItem('todo_list') !== null) {
      todoListData = JSON.parse(localStorage.getItem('todo_list'));
      component();
    } else {
      component();
    }
  };
};

loadPage();
