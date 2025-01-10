function getCurrentDateAndDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayOfWeek = days[today.getDay()];
    const date = today.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' }); // Format date as MM/DD
    return { date, dayOfWeek };
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as HH:MM AM/PM
}

function updateDisplay() {
    const { date, dayOfWeek } = getCurrentDateAndDay();
    document.getElementById('dateDisplay').innerHTML = date;
    document.getElementById('dayDisplay').innerHTML = dayOfWeek;
    document.getElementById('timeDisplay').textContent = getCurrentTime();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function addTaskToDOM(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Done';
    deleteButton.addEventListener('click', function () {
        li.remove();
        removeTaskFromStorage(taskText);
    });

    li.appendChild(deleteButton);
    document.getElementById('taskList').prepend(li);
}

function saveTaskToStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTaskToStorage(taskText);
        taskInput.value = '';
    }
    else {
        alert('Please enter a task!');
    }
});

document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        console.log("a")
        if (query.startsWith('http://') || query.startsWith('https://')) {
            window.location.href = query;
        }
        else if (query.startsWith('yt ')) {
            window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query.slice(3));
        }
        else if (query.startsWith('r/')) {
            window.location.href = 'https://old.reddit.com/r/' + encodeURIComponent(query.slice(2));
        }
        else if (query.startsWith('reddit ')) {
            window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query.slice(7)) + ' site:https://www.reddit.com';
        }
        else if (query.startsWith('so ')) {
            window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query.slice(3)) + ' site:https://stackoverflow.com/';
        }
        else if (query.startsWith('w ')) {
            window.location.href = 'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(query.slice(2));
        }
        else if (query === 'gc' || query === 'desmos') {
            window.location.href = 'https://www.desmos.com/calculator';
        }
        else if (query === 'ai') {
            window.location.href = 'https://duck.ai';
        }
        else if (/^(?=[^.]*\.)[a-z]*(?:\.[a-z]+)*\/?.*$/.test(query)) {
            window.location.href = 'https://' + query;
        }
        else {
            window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
        }
    }
});

setInterval(updateDisplay, 1000);
updateDisplay();
document.getElementById('searchInput').value = '';
document.getElementById('searchInput').focus();
