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

setInterval(updateDisplay, 1000);
updateDisplay();