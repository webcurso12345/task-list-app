let taskListArr = [];

const today = new Date();

const weekday = today.toLocaleString('pt-BR', { day: '2-digit', weekday: 'long' });
const month = today.toLocaleString('pt-BR', { month: 'long' });

document.querySelector('.weekday').innerHTML = weekday;
document.querySelector('.month').innerHTML = month;

// Cria nova tarefa
function newTaskItem(taskItem) {
  const taskListElement = document.querySelector('.task-list');
  const newTaskItemLi = document.createElement('li');

  newTaskItemLi.className += `task-item${taskItem.taskStatus ? ' completed' : ''}`;
  newTaskItemLi.id = taskItem.taskId;
  newTaskItemLi.innerHTML = `<div class='task-item-title'>${taskItem.taskName}</div><div class='task-item-date'>${taskItem.taskDate}</div>`;
  // Adiciona evento de click ao item da lista
  newTaskItemLi.addEventListener('click', (e) => {
    // Adiciona/Remove classe no item da lista caso realizado ou não
    e.currentTarget.classList.toggle('completed');

    // Busca tarefa no vetor de tarefas
    const task = taskListArr.find(taskItem => taskItem.taskId == e.currentTarget.id);

    // Inverte estado da tarefa
    task.taskStatus = !task.taskStatus;

    saveTaskList();
  });

  // Adiciona evento de duplo click ao item da lista
  newTaskItemLi.addEventListener('dblclick', (e) => {
    if (confirm('Você realmente quer remover esta tarefa?')) {

      // Remove elemento
      e.currentTarget.remove();

      // Remove tarefa do vetor
      taskListArr = taskListArr.filter(taskItem => taskItem.taskId != e.currentTarget.id);

      saveTaskList();
    }
  });

  taskListElement.appendChild(newTaskItemLi);
}

// Adiciona nova tarefa a lista
function addTaskItem(taskName, taskDate, taskStatus) {
  // Cria vetor com todos os ids
  const ids = taskListArr.map(task => task.taskId);

  // Testa se existem tarefas e adiciona mais um no ultimo id
  const taskId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  // Declara nova tarefa
  const taskItem = { taskId, taskName, taskDate, taskStatus };

  // Adiciona tarefa ao vetor de tarefas
  taskListArr.push(taskItem)

  newTaskItem(taskItem);

  saveTaskList();
}

// Carrega tarefas do localStorage
function loadTaskList() {
  if (localStorage.getItem('@db-tasklist') !== null) {
    taskListArr = JSON.parse(localStorage.getItem('@db-tasklist'));

    for (taskItem of taskListArr) {
      newTaskItem(taskItem);
    }
  }
}

// Salva tarefas no localStorage
function saveTaskList() {
  localStorage.setItem('@db-tasklist', JSON.stringify(taskListArr));
}

// Adiciona evento click no botão add task
document
  .querySelector('.add-task')
  .addEventListener('click', (e) => {
    const taskName = prompt('Qual a tarefa será realizada?');

    if (taskName !== null && taskName !== '') {
      const taskDate = prompt('Quando a tarefa será realizada?');

      if (taskDate !== null && taskDate !== '') {
        addTaskItem(taskName, taskDate, false);
      }
    }
  })

// Carrega tarefas
loadTaskList();