async function goFullscreen(event) {
	const el = document.documentElement;
	const btn = event.target
	if (!document.fullscreenElement) {
		await el.requestFullscreen();
		btn.innerHTML = 'fullscreen_exit';
	} else {
		await document.exitFullscreen();
		btn.innerHTML = 'fullscreen';
	}
}

document.getElementById('fullscreenIcon').addEventListener('click', goFullscreen);