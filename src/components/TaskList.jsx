import { useState } from "react";
const TaskList = ({ tasks, onChangeTask, onDeleteTask, onEditTask }) => {
  return (
    <div>
      {tasks.map((task) =>
        task.deleted ? null : (
          <Task
            key={task.id}
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        )
      )}
    </div>
  );
};

function Task({ task, onChange, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  return (
    <div>
      {isEditing ? (
        <div className="flex justify-between gap-1 mt-4 items-center">
          <input
            value={editedText}
            onChange={(e) => {
              setEditedText(e.target.value);
            }}
            type="text"
            className="border-b flex-1 outline-none p-2 placeholder:pl-2 placeholder:text-sm text-sm"
          />
          <button
            className="bg-green-800 text-white px-4 py-1 rounded cursor-pointer"
            onClick={() => {
              onEdit(task.id, editedText);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <span
            className="w-6 cursor-pointer relative flex items-center justify-center"
            onClick={() => setIsEditing(false)}
          >
            <span className="w-4 h-0.5 bg-black absolute rotate-45"></span>
            <span className="w-4 h-0.5 bg-black absolute -rotate-45"></span>
          </span>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center border-2 border-zinc-700 px-4 py-2 rounded-xl mt-2">
          <input
            onChange={(e) => onChange(task.id)}
            checked={task.done}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
          />
          <p
            onClick={() => setIsEditing(!isEditing)}
            className={`${task.done ? "line-through text-gray-400" : ""} text-sm sm:text-base text-nowrap`}
          >
            {task.text}
          </p>
          <span className="cursor-pointer relative z-10 w-6" onClick={() => onDelete(task.id)}>
            <span className="w-4 h-0.5 bg-black absolute rotate-45 right-1"></span>
            <span className="w-4 h-0.5 bg-black absolute -rotate-45 right-1"></span>
          </span>
        </div>
      )}
    </div>
  );
}

export default TaskList;
