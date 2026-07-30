const notification = {
    container: document.getElementById("alert"),
    text: document.getElementById("alertText")
};

function playPulse(el) {
    el.animate(
        [
            { opacity: 0, offset: 0 },
            { opacity: 1, offset: 0.05 },
            { opacity: 1, offset: 0.95 },
            { opacity: 0, offset: 1 },
        ],
        {
            duration: 3000,
            easing: "linear",
            fill: "none",
        }
    );
}

function showAlert(text) {
    notification.text.textContent = text;
    playPulse(notification.container);
}