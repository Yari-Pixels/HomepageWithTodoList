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
	if (!/^#(?:[0-9a-fA-F]{6})$/.test(primary) || !/^#(?:[0-9a-fA-F]{6})$/.test(secondary)) {
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

loadBackground();
loadColors();