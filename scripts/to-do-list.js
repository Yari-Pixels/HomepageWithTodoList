let taskInEditMode = null;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
}

function addTaskToList(task) {
    const template = document.getElementById('taskTemplate');
    const taskFragment = template.content.cloneNode(true);
    const taskElement = taskFragment.querySelector('.task-item');

    const textElement = taskElement.querySelector('.task-text');
    const editButton = taskElement.querySelector('.task-edit');
    const deleteButton = taskElement.querySelector('.task-delete');

    textElement.textContent = task.text;
    taskElement.id = task.id;

    editButton.addEventListener('click', () => {
        editTaskButtonPress(task);
    });

    deleteButton.addEventListener('click', () => {
        removeTask(task);
    });

    document.getElementById('taskList').prepend(taskElement);
}

function removeTaskFromList(task) {
    const taskElement = document.getElementById(task.id);
    if (taskElement)
        taskElement.remove();
}

function editTaskInList(task) {
    const taskElement = document.getElementById(task.id);
    const textElement = taskElement.querySelector('.task-text');
    textElement.textContent = task.text;
}

function addTaskToStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = {
        id: crypto.randomUUID(),
        text: taskText
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return task;
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTaskInStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const idx = tasks.findIndex(t => t.id === task.id)
    tasks[idx].text = task.text;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = addTaskToStorage(taskText);
        addTaskToList(task);
        taskInput.value = '';
    }
    else {
        showAlert('Task\'s text can\'t be blank!');
    }
}

function removeTask(task) {
    if (taskInEditMode !== null && taskInEditMode.id === task.id) {
        cancelEdit(task);
    }
    removeTaskFromList(task);
    removeTaskFromStorage(task);
}

function cancelEdit(task) {
    console.log("cancel task: " + task.id);
    const taskElement = document.getElementById(task.id);
    taskElement.classList.remove('edit-mode');
    
    const editButton = taskElement.querySelector('.task-edit');
    editButton.textContent = 'Edit';
    
    const taskInputButton = document.getElementById('addTaskButton');
    taskInputButton.textContent = 'Add Task';
    
    const taskInput = document.getElementById('taskInput');
    taskInput.value = '';
    
    taskInEditMode = null;
}

function startEdit(task) {
    console.log("edit task: " + task.id);
    taskInEditMode = task;
    
    const taskElement = document.getElementById(task.id);
    taskElement.classList.add('edit-mode');
    
    const editButton = taskElement.querySelector('.task-edit');
    editButton.textContent = 'Cancel';
    
    const taskInputButton = document.getElementById('addTaskButton');
    taskInputButton.textContent = 'Edit Task';
    
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task.text;
    taskInput.focus();
}

function editTaskButtonPress(task) {
    console.log('button Press: ' + (task === null ? 'null' : task.id));

    if (taskInEditMode === null) {
        startEdit(task);
        return
    }
    if (taskInEditMode.id !== task.id) {
        cancelEdit(taskInEditMode);
        startEdit(task);
        return;
    }
    cancelEdit(task);
}

function editTask() {
    const taskInputButton = document.getElementById('addTaskButton');
    taskInputButton.textContent = 'Edit Task';

    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        showAlert('Task\'s text can\'t be blank!');
        return;
    }

    taskInEditMode.text = taskText;
    
    editTaskInStorage(taskInEditMode);
    editTaskInList(taskInEditMode);
    cancelEdit(taskInEditMode);
    
    document.getElementById('taskInput').value = '';
    taskInEditMode = null;
}

function addOrEditChoice(event) {
    event.preventDefault();
    if (taskInEditMode === null)
        addTask(event);
    else
        editTask(event);
}

document.getElementById('addTaskButton').addEventListener('click', addOrEditChoice);
document.getElementById('taskInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addOrEditChoice(event)
    }
});

loadTasks();