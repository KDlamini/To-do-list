export const isComplete = (complete, description) => {
  if (complete) {
    description.style.textDecoration = 'line-through';
    description.style.color = '#414141';
  } else {
    description.style.textDecoration = 'none';
    description.style.color = '#000';
  }
};

export const checkboxEvent = (checkbox, todo, todoListData, saveToLocalStorage, refreshPage) => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      todo.completed = true;
      saveToLocalStorage(todoListData);
      refreshPage();
    } else {
      todo.completed = false;
      saveToLocalStorage(todoListData);
      refreshPage();
    }
  });
};