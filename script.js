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
        if (query.startsWith('d ')) {
            window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query.slice(2));
        }
        else if (/^https:\/\/(?=[^.]*\.)[a-z]*(?:\.[a-z]+)*\/?[!-~]*$/.test(query)) {
            window.location.href = query;
        }
        else if (/^(?=[^.]*\.)[a-z]*(?:\.[a-z]+)*\/?[!-~]*$/.test(query)) {
            window.location.href = 'https://' + query;
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
        else if (query === 'yt') {
            window.location.href = 'https://www.youtube.com';
        }
        else if (query === 'gc' || query === 'desmos') {
            window.location.href = 'https://www.desmos.com/calculator';
        }
        else if (query === 'ai') {
            window.location.href = 'https://duck.ai';
        }
        else {
            window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
        }
    }
});

document.getElementById('submitBackgroundImage').addEventListener('click', submitBackground);
document.getElementById('resetBackgroundImage').addEventListener('click', resetBackground);

document.getElementById('submitPrimaryColor').addEventListener('click', submitColors);
document.getElementById('submitSecondaryColor').addEventListener('click', submitColors);
document.getElementById('resetPrimaryColor').addEventListener('click', resetColors);
document.getElementById('resetSecondaryColor').addEventListener('click', resetColors);

document.getElementById('primaryColor').addEventListener('input', updatePicker);
document.getElementById('secondaryColor').addEventListener('input', updatePicker);
document.getElementById('primaryColorPicker').addEventListener('change', updateColorInput);
document.getElementById('secondaryColorPicker').addEventListener('change', updateColorInput);

document.getElementById('settingsIcon').addEventListener('click', () => {
    document.getElementById('settings').classList.toggle('hidden');
});

function displayBackground(url) {
    if (url == 0) {
        alert('please input a valid url')
        return;
    }
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url(${url})`;
}

function submitBackground() {
    const backgroundImage = document.getElementById('backgroundImage').value;
    localStorage.setItem('background', JSON.stringify(backgroundImage));
    displayBackground(backgroundImage);
}

function resetBackground() {
    const backgroundImage = 'default.png';
    document.getElementById('backgroundImage').value = backgroundImage;
    localStorage.setItem('background', JSON.stringify(backgroundImage));
    displayBackground(backgroundImage);
}

function loadBackground() {
    const backgroundImage = JSON.parse(localStorage.getItem('background')) || [];
    if (backgroundImage == 0)
        return;
    document.getElementById('backgroundImage').value = backgroundImage;
    displayBackground(backgroundImage);
}

function applyColors(primary, secondary) {
    if (!/^#(?:[0-9a-fA-F]{6})$/.test(primary) || !/^#(?:[0-9a-fA-F]{6})$/.test(secondary))
    {
        alert('Please input valid color hex code.')
        return;
    }
    const root = document.querySelector(':root');
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--secondary', secondary);
    root.style.setProperty('--secondary-transparent', secondary + '80');
}

function submitColors() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    localStorage.setItem('primaryColor', JSON.stringify(primaryColor));
    localStorage.setItem('secondaryColor', JSON.stringify(secondaryColor));
    applyColors(primaryColor, secondaryColor);
}

function resetColors() {
    const primaryColor = '#8CDCE1';
    const secondaryColor = '#FBD36A';
    localStorage.setItem('primaryColor', JSON.stringify(primaryColor));
    localStorage.setItem('secondaryColor', JSON.stringify(secondaryColor));
    document.getElementById('primaryColor').value = primaryColor;
    document.getElementById('primaryColorPicker').value = primaryColor;
    document.getElementById('secondaryColor').value = secondaryColor;
    document.getElementById('secondaryColorPicker').value = secondaryColor;
    applyColors(primaryColor, secondaryColor);
}

function loadColors() {
    const primaryColor = JSON.parse(localStorage.getItem('primaryColor')) || [];
    const secondaryColor = JSON.parse(localStorage.getItem('secondaryColor')) || [];
    if (!/^#(?:[0-9a-fA-F]{6})$/.test(primaryColor) || !/^#(?:[0-9a-fA-F]{6})$/.test(secondaryColor))
        return;
    document.getElementById('primaryColor').value = primaryColor;
    document.getElementById('primaryColorPicker').value = primaryColor;
    document.getElementById('secondaryColor').value = secondaryColor;
    document.getElementById('secondaryColorPicker').value = secondaryColor;
    applyColors(primaryColor, secondaryColor);
}

function updatePicker(event) {
    const colorInput = event.target;
    if (!/^#(?:[0-9a-fA-F]{6})$/.test(colorInput.value))
        return;
    const id = colorInput.id + 'Picker';
    const picker = document.getElementById(id);
    picker.value = colorInput.value;
}

function updateColorInput(event) {
    const picker = event.target;
    const id = picker.id.slice(0, -6);
    const colorInput = document.getElementById(id);
    colorInput.value = picker.value;
}
// localStorage.getItem('background');
// localStorage.setItem('user', JSON.stringify(obj));

setInterval(updateDisplay, 1000);
updateDisplay();
loadBackground();
loadColors();
document.getElementById('searchInput').value = '';
document.getElementById('searchInput').focus();
