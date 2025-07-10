import "./App.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import usePersistedTasks from "./usePersistedTasks";
import { useEffect, useRef } from "react";

function App() {
  const [tasks, dispatch] = usePersistedTasks([]);

  const remainingTasks = tasks.filter((task) => !task.done && !task.deleted);
  const completedTasks = tasks.filter((task) => task.done && !task.deleted);
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [tasks.length]);

  function handleAddTask(text) {
    dispatch({
      type: "add",
      payload: {
        id: window.crypto.randomUUID(),
        text: text,
        done: false,
        deleted: false
      },
    });
  }

  function handleOnChangeTask(taskId) {
    dispatch({
      type: 'toggleDone',
      payload: { id: taskId }
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "softDelete",
      payload: { id: taskId }
    });
  }

  function handleEditTask(taskId, newText) {
    dispatch({
      type: "edit",
      payload: { id: taskId, text: newText }
    });
  }

  return (
    <main className="sm:w-md min-w-54 mt-16">
      <h1 className="text-xl font-bold text-left mb-1">Your ToDo</h1>
      <AddTask onAddTask={handleAddTask} />
      <div className="mt-6 h-[300px] sm:h-[400px] overflow-auto scroll-smooth" ref={listRef}>
        <TaskList
          tasks={tasks}
          onChangeTask={handleOnChangeTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>
      <div className="mt-8 flex border-t border-zinc-700 pt-4 justify-end">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">Remaining tasks: {remainingTasks.length}</span>
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">Completed tasks: {completedTasks.length}</span>
      </div>
    </main>
  );
}

export default App;
