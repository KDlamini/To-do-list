export const isComplete = (complete, description) => {
  if (complete) {
    description.style.textDecoration = 'line-through';
    description.style.color = '#414141';
  } else {
    description.style.textDecoration = 'none';
    description.style.color = '#000';
  }
};

export const checkboxEvent = (checkbox, todo, saveToLocalStorage, refreshPage) => {
  checkbox.addEventListener('change', (e) => {
    if (checkbox.checked) {
      todo.completed = true;
      saveToLocalStorage();
      refreshPage();
    } else {
      todo.completed = false;
      saveToLocalStorage();
      refreshPage();
    }
  });
};