const taskList = document.getElementById('lista-tarefas');
const inputTaks = document.getElementById('texto-tarefa');
const buttonAddTask = document.getElementById('criar-tarefa');
const buttonSaveTasks = document.getElementById('salvar-tarefas');
const buttonMoveToAbove = document.getElementById('mover-cima');
const buttonMoveToBelow = document.getElementById('mover-baixo');
const buttonRemoveSelectedTask = document.getElementById('remover-selecionado');

function selectListItem(click) {
  const selectedItem = click.target;
  const previousSelectedItem = document.querySelector('.selected');
  if (previousSelectedItem) {
    previousSelectedItem.classList.remove('selected');
  }
  selectedItem.classList.add('selected');
}

function removeSelectedListItem(event) {
  taskList.removeChild(event.target.parentNode);
}

buttonRemoveSelectedTask.addEventListener('click', removeSelectedListItem);

function markItemAsCompleted(dblclick) {
  const markedItem = dblclick.target;
  if (markedItem.classList.contains('completed')) {
    markedItem.classList.remove('completed');
  } else {
    markedItem.classList.add('completed');
  }
}

function moveItemToAbove() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const previousItem = selectedItem.previousElementSibling;
    if (previousItem) {
      taskList.insertBefore(previousItem, selectedItem.nextElementSibling);
    }
  }
}

buttonMoveToAbove.addEventListener('click', moveItemToAbove);

function moveItemToBelow() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const nextItem = selectedItem.nextElementSibling;
    if (nextItem) {
      taskList.insertBefore(nextItem, selectedItem);
    }
  }
}

buttonMoveToBelow.addEventListener('click', moveItemToBelow);

function clearList() {
  taskList.innerHTML = '';
}

const buttonClearList = document.getElementById('apaga-tudo');
buttonClearList.addEventListener('click', clearList);

function clearCompletedTasks() {
  const arrayListItems = document.querySelectorAll('.completed');
  for (let i = 0; i < arrayListItems.length; i += 1) {
    taskList.removeChild(arrayListItems[i]);
  }
}

const buttonClearCompletedItems = document.getElementById('remover-finalizados');
buttonClearCompletedItems.addEventListener('click', clearCompletedTasks);

function createCheckbox() {
  const newCheckbox = document.createElement('span');
  newCheckbox.className = 'far fa-square checkbox';
  newCheckbox.title = 'Marcar item como concluído';
  return newCheckbox;
}

function createEditButton() {
  const newEditButton = document.createElement('span');
  newEditButton.className = 'fas fa-edit edit-button';
  newEditButton.title = 'Editar item';
  return newEditButton;
}

function createRemoveButton() {
  const newRemoveButton = document.createElement('span');
  newRemoveButton.className = 'fas fa-trash-alt remove-button';
  newRemoveButton.title = 'Remover item';
  newRemoveButton.addEventListener('click', removeSelectedListItem);
  return newRemoveButton;
}

function addTaskOnTheList() {
  if (inputTaks.value) {
    const newTask = document.createElement('li');
    newTask.appendChild(createCheckbox());
    const newTaskText = document.createElement('span');
    newTaskText.className = 'list-text';
    newTaskText.innerHTML = inputTaks.value;
    newTask.appendChild(newTaskText);
    newTask.appendChild(createEditButton());
    newTask.appendChild(createRemoveButton());
    taskList.appendChild(newTask);
  }
}

function pressEnterToAddTask(event) {
  if (event.key === 'Enter') {
    addTaskOnTheList();
  }
}

buttonAddTask.addEventListener('click', addTaskOnTheList);
inputTaks.addEventListener('keypress', pressEnterToAddTask);

function clearInputTask() {
  inputTaks.value = '';
}

function saveTasks() {
  localStorage.clear();
  const arrayListItems = taskList.children;
  for (let i = 0; i < arrayListItems.length; i += 1) {
    localStorage.setItem(`${i + 1}`, `${arrayListItems[i].innerHTML}`);
    localStorage.setItem(`${i + 1} className`, `${arrayListItems[i].className}`);
  }
}

buttonSaveTasks.addEventListener('click', saveTasks);

function loadSavedTasks() {
  for (let i = 0; i < (localStorage.length / 2); i += 1) {
    const newTask = document.createElement('li');
    newTask.innerHTML = localStorage.getItem(`${i + 1}`);
    newTask.className = localStorage.getItem(`${i + 1} className`);
    newTask.addEventListener('click', selectListItem);
    newTask.addEventListener('dblclick', markItemAsCompleted);
    taskList.appendChild(newTask);
  }
}

function onLoadPage() {
  clearInputTask();
  if (localStorage.length !== 0) {
    loadSavedTasks();
  }
}

window.onload = onLoadPage;
