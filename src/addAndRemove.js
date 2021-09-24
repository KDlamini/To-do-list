export const addToDo = (input, todoListData) => {
  const dataObj = {
    index: todoListData.length,
    description: '',
    completed: false,
  };

  dataObj.description = input;
  todoListData.push(dataObj);
};

export const capitalizeDescription = (value) => {
  return value.toLowerCase().charAt(0).toUpperCase() + value.slice(1);
};

// clear previous active items
const clearPreviousActiveItem = (todoItemArray) => {
  todoItemArray.forEach((item) => {
    if (item.lastElementChild.classList.contains('task-button')) {
      item.style.background = 'rgba(225, 253, 255, 0.25)';
      item.lastElementChild.innerHTML = '<i class=\'ellipsis vertical icon\'></i>';
    }
  });
};

// Clear all items in the list
export const clearAll = (clear, todoListData, saveToLocalStorage, refreshPage) => {
  clear.addEventListener('click', () => {
    todoListData.splice(0);
    saveToLocalStorage(todoListData);
    refreshPage();
  });
};

// Clear all completed items on the list
export const clearAllCompleted = (clearCompleted, todoListData, createIndexes, saveToLocalStorage, refreshPage) => {
  clearCompleted.addEventListener('click', () => {
    todoListData = todoListData.filter((todo) => todo.completed !== true);
    createIndexes(todoListData);
    saveToLocalStorage(todoListData);
    refreshPage();
  });
};

// get active item index onclick
const getActiveItemIndex = (todoListData, value) => {
  let index = 0;

  todoListData.forEach((data) => {
    if (data.description === value.toLowerCase()) {
      index = data.index;
    }
  });

  return index;
};

// Change task-button and background for active item
const changeTaskButton = (activeDescription, activeDeleteButton) => {
  activeDescription.parentNode.style.background = '#ffff0080';
  activeDeleteButton.innerHTML = '<i class=\'trash alternate icon\'></i>';
};

// Handle delete for active item description
export const deleteItem = (todoListData, createIndexes, saveToLocalStorage, refreshPage) => {
  const deleteButtonArray = document.querySelectorAll('.task-button');

  deleteButtonArray.forEach((button) => {
    button.addEventListener('click', (e) => {
      let index;

      if (e.target.classList.contains('trash', 'icon')) {
        index = getActiveItemIndex(todoListData, e.target.parentNode.parentNode.childNodes[1].value);
      } else {
        index = getActiveItemIndex(todoListData, e.target.parentNode.childNodes[1].value);
      }
      
      todoListData.splice(index, 1);
      createIndexes(todoListData);
      saveToLocalStorage(todoListData);
      refreshPage();
    });
  });
};

export const updateList = (todoListData, saveToLocalStorage, refreshPage) => {
  const todoContainer = document.querySelector('.todo-list-container');
  const todoItemArray = Array.from(document.querySelectorAll('.todo-item'));

  todoContainer.addEventListener('click', (e) => {
    clearPreviousActiveItem(todoItemArray);

    if (e.target.classList.contains('description')) {
      const activeDescription = e.target;
      const activeIndex = getActiveItemIndex(todoListData, activeDescription.value);

      // Change to delete button
      changeTaskButton (activeDescription, activeDescription.parentNode.lastElementChild);
    
      // Handle change for active item description
      activeDescription.addEventListener('change', () => {
        todoListData[activeIndex].description = capitalizeDescription(activeDescription.value);
        saveToLocalStorage(todoListData);
        refreshPage();
      });
    }
  });
};