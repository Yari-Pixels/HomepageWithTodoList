const version = 1;
const userVersion = Number(localStorage.getItem('version')) || 0;

function hasLocalStorageData() {
    return localStorage.length > 0;
}

function migrate_original_to_v1() {
    const raw = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTasks = raw.map((t) => {
        if (typeof t === 'string') 
            return {
                id: crypto.randomUUID(),
                text: t 
            };
        if (t && typeof t === 'object' && 'text' in t) {
            return {
                id: t.id || crypto.randomUUID(),
                text: t.text
            };
        }
        return {
            id: crypto.randomUUID(),
            text: String(t)
        };
    });
    
    localStorage.setItem('tasks', JSON.stringify(newTasks));
}

if (hasLocalStorageData()) {
    if (version === 1 && userVersion === 0)
        migrate_original_to_v1();
}
localStorage.setItem('version', version);