import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");
  return (
    <div className="flex justify-between gap-4">
      <input
        value={text}
        type="text"
        className="border-b flex-1 outline-none p-2 placeholder:pl-2 placeholder:text-sm"
        placeholder="Add new task"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={`bg-zinc-800 p-4 rounded-lg w-2 h-2 flex justify-center items-center text-white cursor-pointer hover:bg-zinc-900`}
        onClick={() => {
            setText("");
            onAddTask(text)
        }}
      >
        +
      </button>
    </div>
  );
};

export default AddTask;
