export function taskReducer(tasks, action) {
    switch (action.type) {
        case "add": {
            return [...tasks, action.payload];
        }
        case "toggleDone": {
            return tasks.map(t => 
                t.id === action.payload.id ? { ...t, done: !t.done } : t
            );
        }
        case "softDelete": {
            return tasks.map(t => 
                t.id === action.payload.id ? { ...t, deleted: true } : t
            );
        }
        case "edit": {
            return tasks.map(t => 
                t.id === action.payload.id ? { ...t, text: action.payload.text } : t
            );
        }
        default: {
            return tasks;
        }
    }
}