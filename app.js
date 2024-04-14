const TO_DO_KEY = 'to-do-list';

const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('.todo_input');
const todoSubmitBtn = document.querySelector('.todo_submit_button');
const todos = document.querySelector('.todos');
let savedList = [];
const getSavedList = localStorage.getItem(TO_DO_KEY);

//리스트 돔 생성
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

//리스트 저장
const saveList = () => {
  localStorage.setItem(TO_DO_KEY, JSON.stringify(savedList));
};

//새로고침시 저장된 리스트 유지
if (getSavedList) {
  const parsedTodos = JSON.parse(getSavedList);
  //새로고침하면 빈 배열이 아닌 로컬스토리지에 저장되어있는 값으로 할당
  savedList = parsedTodos;
  parsedTodos.forEach((list) => {
    createListDOM(list);
  });
}

//삭제
const onDeleteList = (e) => {
  const target = e.target;
  if (e.target.className !== 'todo_remove_button') return;
  const targetList = target.closest('li');
  targetList.remove();
  //클릭된 li의 id 값과, 로컬리스트의 아이디가 같은거 제외 리턴
  //저장된 리스트에 다시 할당해줌
  savedList = savedList.filter((list) => {
    return list.id !== parseInt(targetList.dataset.id);
  });
  //다시할당해준 값으로 로컬스토리지 업데이트해줌
  saveList();
};

//추가
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