import { useEffect, useReducer } from "react";
import { taskReducer } from "./tasksReducer";

const STORAGE_KEY = "tasks";

export default function usePersistedTasks( initial = [] ) {
    const [tasks, dispatch] = useReducer(taskReducer, initial, () => {
        try {
           const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
           return saved ?? initial;
        } catch {
           return initial; 
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    return [tasks, dispatch];
}