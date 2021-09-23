export const addToDo = (input, todoListData) => {
  const dataObj = {
    index: todoListData.length,
    description: '',
    completed: false,
  };

  dataObj.description = input;
  todoListData.push(dataObj);
};

export const modifyList = (todoListData, saveToLocalStorage, createIndexes, refreshPage) => {
  const todoContainer = document.querySelector('.todo-list-container');
  const todoItemArray = Array.from(document.querySelectorAll('.todo-item'));

  // clear previous active item
  todoContainer.addEventListener('click', (e) => {
    todoItemArray.forEach((item) => {
      if (item.lastElementChild.classList.contains('task-button')) {
        item.style.background = 'rgba(225, 253, 255, 0.25)';
        item.lastElementChild.innerHTML = '<i class=\'ellipsis vertical icon\'></i>';
      }
    });

    const activeDescription = e.target;
    const activeDeleteButton = e.target.parentNode.lastElementChild;
    let activeIndex = 0;

    // get index for active item
    todoListData.forEach((data) => {
      if (data.description === activeDescription.value) {
        activeIndex = data.index;
      }
    });

    // Change button and background for active item
    if (e.target.classList.contains('description')) {
      activeDescription.parentNode.style.background = '#ffff0080';
      activeDeleteButton.innerHTML = '<i class=\'trash alternate icon\'></i>';

      // Handle change for active item description
      activeDescription.addEventListener('change', () => {
        todoListData[activeIndex].description = activeDescription.value;
        saveToLocalStorage();
      });

      // Handle delete for active item description
      activeDeleteButton.addEventListener('click', () => {
        todoListData.splice(activeIndex, 1);
        createIndexes();
        saveToLocalStorage();
        refreshPage();
      });
    }
  });
};
