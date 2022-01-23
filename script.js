/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
/* eslint-disable no-console */

const taskList = document.getElementById('lista-tarefas');
const inputTaks = document.getElementById('texto-tarefa');
const buttonAddTask = document.getElementById('criar-tarefa');
const buttonSaveTasks = document.getElementById('salvar-tarefas');
const buttonMoveToAbove = document.getElementById('mover-cima');
const buttonMoveToBelow = document.getElementById('mover-baixo');

let dragStartIndex = 0;

function removeSelectedListItem(event) {
  taskList.removeChild(event.target.parentNode);
}

function markItemAsCompleted(click) {
  const markedItem = click.target;
  if (markedItem.classList.contains('fa-square')) {
    markedItem.classList.remove('fa-square');
    markedItem.classList.add('fa-check-square');
    markedItem.nextElementSibling.classList.add('completed');
  } else if (markedItem.classList.contains('fa-check-square')) {
    markedItem.classList.remove('fa-check-square');
    markedItem.classList.add('fa-square');
    markedItem.nextElementSibling.classList.remove('completed');
  }
}

function editButtonAction(click) {
  const editInput = click.target.previousElementSibling;
  const currentTask = editInput.previousElementSibling;
  editInput.value = currentTask.textContent;
  currentTask.style.display = 'none';
  editInput.style.display = 'flex';
  editInput.focus();
}

function editTask(input) {
  const editInput = input;
  const currentTask = editInput.previousElementSibling;
  if (editInput.value) {
    currentTask.textContent = editInput.value;
    editInput.style.display = 'none';
    currentTask.style.display = 'flex';
    editInput.value = '';
  } else {
    editInput.style.display = 'none';
    currentTask.style.display = 'flex';
    editInput.value = '';
  }
}

function changeToEditTask(event) {
  editTask(event.target);
}

function pressEnterToEditTask(event) {
  if (event.key === 'Enter') {
    editTask(event.target);
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
  newCheckbox.title = 'Marcar tarefa como concluída';
  newCheckbox.addEventListener('click', markItemAsCompleted);
  return newCheckbox;
}

function createTaskText(string) {
  const newTaskText = document.createElement('span');
  newTaskText.className = 'list-text';
  newTaskText.title = 'Tarefa';
  newTaskText.textContent = string;
  return newTaskText;
}

function createEditButton() {
  const newEditButton = document.createElement('span');
  newEditButton.className = 'fas fa-edit edit-button';
  newEditButton.title = 'Editar tarefa';
  newEditButton.addEventListener('click', editButtonAction);
  return newEditButton;
}

function createInputEditTask() {
  const newEditInput = document.createElement('input');
  newEditInput.type = 'text';
  newEditInput.className = 'edit-input';
  newEditInput.style.display = 'none';
  newEditInput.style.flexGrow = '1';
  newEditInput.addEventListener('keypress', pressEnterToEditTask);
  newEditInput.addEventListener('blur', changeToEditTask);
  return newEditInput;
}

function createRemoveButton() {
  const newRemoveButton = document.createElement('span');
  newRemoveButton.className = 'fas fa-trash-alt remove-button';
  newRemoveButton.title = 'Remover tarefa';
  newRemoveButton.addEventListener('click', removeSelectedListItem);
  return newRemoveButton;
}

// Lógica para mover itens da lista foi inspirada nessa vídeoaula: https://youtu.be/wv7pvH1O5Ho

function dragOver(event) {
  event.preventDefault();
}

function dragStart(event) {
  event.target.classList.add('dragging');
  dragStartIndex = [...taskList.children].indexOf(event.target);
}

function dragEntersElement(event) {
  event.target.classList.add('dragover');
}

function dragLeavesElement(event) {
  event.target.classList.remove('dragover');
}

function swapListItems(origin, destination) {
  const arrayListItems = [...taskList.children];
  const firstItem = arrayListItems[origin];
  const secondItem = arrayListItems[destination];

  taskList.insertBefore(firstItem, secondItem.nextSibling);
}

function dropElement(event) {
  event.target.classList.remove('dragover');
  const dragEndIndex = [...taskList.children].indexOf(event.target);
  const draggedElement = document.querySelector('.dragging');
  draggedElement.classList.remove('dragging');
  swapListItems(dragStartIndex, dragEndIndex);
}

function addEventListenersToTasks(task) {
  task.addEventListener('dragover', dragOver);
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragenter', dragEntersElement);
  task.addEventListener('dragleave', dragLeavesElement);
  task.addEventListener('drop', dropElement);
  task.draggable = 'true';
}

function addTaskOnTheList() {
  if (inputTaks.value) {
    const newTask = document.createElement('li');
    newTask.appendChild(createCheckbox());
    newTask.appendChild(createTaskText(inputTaks.value));
    newTask.appendChild(createInputEditTask());
    newTask.appendChild(createEditButton());
    newTask.appendChild(createRemoveButton());
    addEventListenersToTasks(newTask);
    taskList.appendChild(newTask);
    inputTaks.value = '';
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
  const arrayListItems = [...taskList.children];
  arrayListItems.forEach((task, index) => {
    localStorage.setItem(`${index + 1}`, task.innerHTML);
  });
}

buttonSaveTasks.addEventListener('click', saveTasks);

function recoverEventListeners(task) {
  const taskChildren = [...task.children];
  taskChildren.forEach((child, index) => {
    switch (index) {
      case 0:
        child.addEventListener('click', markItemAsCompleted);
      break;
      case 2:
        child.addEventListener('keypress', pressEnterToEditTask);
        child.addEventListener('blur', changeToEditTask);
        break;
      case 3:
        child.addEventListener('click', editButtonAction);
        break;
      case 4:
        child.addEventListener('click', removeSelectedListItem);
        break;
      default:
        break;
    }
  });
}

function loadSavedTasks() {
  for (let index = 0; index < localStorage.length; index += 1) {
    const newTask = document.createElement('li');
    newTask.innerHTML = localStorage.getItem(`${index + 1}`);
    addEventListenersToTasks(newTask);
    recoverEventListeners(newTask);
    taskList.appendChild(newTask);
  }
}

window.onload = () => {
  clearInputTask();
  if (localStorage.length !== 0) {
    loadSavedTasks();
  }
};
