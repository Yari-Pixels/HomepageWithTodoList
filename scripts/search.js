const openSameTab = (() => {
    const params = new URLSearchParams(window.location.search);
    return params.has("openSameTab");
})();

function openPage(url) {
    if (openSameTab) {
        window.location.href = url;
    }
    else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

function processSearch() {
    const query = searchInput.value.trim();
    if (query === null || query === '') {
        showAlert('Search field can\'t be blank!')
    }
    else if (query.startsWith('d ')) {
        openPage('https://duckduckgo.com/?q=' + encodeURIComponent(query.slice(2)));
    }
    else if (/^https:\/\/(?=[^.]*\.)[a-z]*(?:\.[a-z]+)*\/?[!-~]*$/.test(query)) {
        openPage(query);
    }
    else if (/^(?=[^.]*\.)[a-z]*(?:\.[a-z]+)*\/?[!-~]*$/.test(query)) {
        openPage('https://' + query);
    }
    else if (query.startsWith('yt ')) {
        openPage('https://www.youtube.com/results?search_query=' + encodeURIComponent(query.slice(3)));
    }
    else if (query.startsWith('r/')) {
        openPage('https://old.reddit.com/r/' + encodeURIComponent(query.slice(2)));
    }
    else if (query.startsWith('reddit ')) {
        openPage('https://duckduckgo.com/?q=' + encodeURIComponent(query.slice(7)) + ' site:https://www.reddit.com');
    }
    else if (query.startsWith('so ')) {
        openPage('https://duckduckgo.com/?q=' + encodeURIComponent(query.slice(3)) + ' site:https://stackoverflow.com/');
    }
    else if (query.startsWith('w ')) {
        openPage('https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(query.slice(2)));
    }
    else if (query === 'yt') {
        openPage('https://www.youtube.com');
    }
    else if (query === 'gc' || query === 'desmos') {
        openPage('https://www.desmos.com/calculator');
    }
    else {
        openPage('https://duckduckgo.com/?q=' + encodeURIComponent(query));
    }
    searchInput.value = '';
}

document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch();
    }
});

document.getElementById('searchInput').value = '';
document.getElementById('searchInput').focus();