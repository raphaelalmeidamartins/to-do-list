/* eslint-disable max-lines */
/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
/* eslint-disable no-console */

// Seletores
const taskList = document.getElementById('lista-tarefas');
const inputTaks = document.getElementById('texto-tarefa');
const buttonAddTask = document.getElementById('criar-tarefa');
const buttonSaveTasks = document.getElementById('salvar-tarefas');
const buttonMoveToAbove = document.getElementById('mover-cima');
const buttonMoveToBelow = document.getElementById('mover-baixo');
const buttonClearList = document.getElementById('apaga-tudo');
const buttonClearCompletedItems = document.getElementById('remover-finalizados');

// Seletores modals
const firstModal = document.getElementById('modal-remover-finalizados');
const secondModal = document.getElementById('modal-apaga-tudo');
const thirdModal = document.getElementById('modal-error');
const acceptRemoveCompleted = document.getElementById('confirmar-remover-finalizados');
const cancelRemoveCompleted = document.getElementById('negar-remover-finalizados');
const acceptClearList = document.getElementById('confirmar-apaga-tudo');
const cancelClearList = document.getElementById('negar-apaga-tudo');
const acceptError = document.getElementById('confirmar-erro');
const errorParagraph = document.getElementById('error-paragraph');

let dragStartIndex = 0;

function callFirstModal() {
  firstModal.style.display = 'block';
}

function callSecondModal() {
  secondModal.style.display = 'block';
}

function removeModal(click) {
  if (click.target.id === 'negar-remover-finalizados') {
    firstModal.style.display = 'none';
  }
  if (click.target.id === 'negar-apaga-tudo') {
    secondModal.style.display = 'none';
  }
  if (click.target.id === 'confirmar-erro') {
    thirdModal.style.display = 'none';
  }
}

function selectListItem(event) {
  const selectedItem = event.target;
  const previousSelectedItem = document.querySelector('.selected');
  if (previousSelectedItem) {
    previousSelectedItem.classList.remove('selected');
  }
  if (selectedItem.tagName === 'LI') {
    selectedItem.classList.add('selected');
  } else {
    selectedItem.parentElement.classList.add('selected');
  }
}

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

function moveItemToBelow() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const nextItem = selectedItem.nextElementSibling;
    if (nextItem) {
      taskList.insertBefore(nextItem, selectedItem);
    }
  }
}

function clearList() {
  secondModal.style.display = 'none';
  taskList.innerHTML = '';
}

function clearCompletedTasks() {
  firstModal.style.display = 'none';
  const arrayListItems = [...document.querySelectorAll('.completed')];
  arrayListItems.forEach((item) => {
    taskList.removeChild(item.parentNode);
  });
}

function createGrip() {
  const newGrip = document.createElement('span');
  newGrip.className = 'fas fa-grip-vertical grip';
  newGrip.title = 'Mover item de posição';
  return newGrip;
}

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
  newTaskText.textContent = string.substr(0, 40);
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
  if (origin < destination) {
    taskList.insertBefore(firstItem, secondItem.nextSibling);
  } else if (origin > destination) {
    taskList.insertBefore(firstItem, secondItem);
  }
}

function dropElement(event) {
  event.target.classList.remove('dragover');
  const dragEndIndex = [...taskList.children].indexOf(event.target);
  const draggedElement = document.querySelector('.dragging');
  draggedElement.classList.remove('dragging');
  swapListItems(dragStartIndex, dragEndIndex);
}

function dragEnd() {
  const draggedElement = document.querySelector('.dragging');
  draggedElement.classList.remove('dragging');
}

function addEventListenersToTasks(task) {
  task.addEventListener('click', selectListItem);
  task.addEventListener('dragstart', selectListItem);
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragover', dragOver);
  task.addEventListener('dragenter', dragEntersElement);
  task.addEventListener('dragleave', dragLeavesElement);
  task.addEventListener('drop', dropElement);
  task.addEventListener('dragend', dragEnd);
  task.draggable = 'true';
}

// eslint-disable-next-line max-statements
function addTaskOnTheList() {
  if ([...taskList.children].length >= 50) {
    throw new Error('a lista já atingiu a quantidade máxima permitida de 50 itens.');
  }
  if (inputTaks.value) {
    const newTask = document.createElement('li');
    newTask.appendChild(createGrip());
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
    try {
      addTaskOnTheList();
    } catch (error) {
      errorParagraph.textContent = `Erro: ${error.message}`;
      thirdModal.style.display = 'block';
    }
  }
}

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

function recoverEventListeners(task) {
  const taskChildren = [...task.children];
  taskChildren.forEach((child, index) => {
    switch (index) {
      case 1:
        child.addEventListener('click', markItemAsCompleted);
      break;
      case 3:
        child.addEventListener('keypress', pressEnterToEditTask);
        child.addEventListener('blur', changeToEditTask);
        break;
      case 4:
        child.addEventListener('click', editButtonAction);
        break;
      case 5:
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

// Escutadores
buttonMoveToAbove.addEventListener('click', moveItemToAbove);
buttonMoveToBelow.addEventListener('click', moveItemToBelow);
buttonAddTask.addEventListener('click', () => {
  try {
    addTaskOnTheList();
  } catch (error) {
    errorParagraph.textContent = `Erro: ${error.message}`;
    thirdModal.style.display = 'block';
  }
});
inputTaks.addEventListener('keypress', pressEnterToAddTask);
buttonSaveTasks.addEventListener('click', saveTasks);
buttonClearCompletedItems.addEventListener('click', callFirstModal);
buttonClearList.addEventListener('click', callSecondModal);
acceptClearList.addEventListener('click', clearList);
cancelClearList.addEventListener('click', removeModal);
acceptRemoveCompleted.addEventListener('click', clearCompletedTasks);
cancelRemoveCompleted.addEventListener('click', removeModal);
acceptError.addEventListener('click', removeModal);

window.onload = () => {
  clearInputTask();
  if (localStorage.length !== 0) {
    loadSavedTasks();
  }
};
