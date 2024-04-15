const TO_DO_KEY = 'to-do-list';

const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('.todo_input');
const todoSubmitBtn = document.querySelector('.todo_submit_button');
const todos = document.querySelector('.todos');
let savedList = [];
const getSavedList = localStorage.getItem(TO_DO_KEY);

// Generate list dorm
const createListDOM = (todoInfo) => {
  const { id, text } = todoInfo;
  const item = document.createElement('li');
  item.innerHTML = '';
  item.className = 'item';
  item.dataset.id = id;
  item.innerHTML = `
  <div class="content">${text}</div>
  <div class="item_buttons">
    <button class="todo_remove_button">
      <i class="bx bxs-trash"></i>
    </button>
  </div>
  `;
  todos.appendChild(item);
};

// Save item in JSON
const saveList = () => {
  localStorage.setItem(TO_DO_KEY, JSON.stringify(savedList));
};

// Keep the list even with the refresh button
if (getSavedList) {
  const parsedTodos = JSON.parse(getSavedList);

  //When you refresh, it assigns the values stored in local storage instead of an empty array.
  savedList = parsedTodos;
  parsedTodos.forEach((list) => {
    createListDOM(list);
  });
}

//Delete
const onDeleteList = (e) => {
  const target = e.target;
  if (e.target.className !== 'todo_remove_button') return;
  const targetList = target.closest('li');
  targetList.remove();
// Return items from the stored list excluding those with IDs matching the clicked LI's ID
// Then reassign the updated list
  savedList = savedList.filter((list) => {
    return list.id !== parseInt(targetList.dataset.id);
  });
// Assuming 'storedList' is the updated list after filtering out the clicked LI's ID
  saveList();
};

//Add new list
const onAddList = () => {
  const todoInfo = {
    id: Date.now(),
    text: todoInput.value,
  };

  createListDOM(todoInfo);
  todoInput.value = '';
  todoInput.focus();
  savedList.push(todoInfo);
  saveList(todoInfo);
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  onAddList();
});

todos.addEventListener('click', onDeleteList);