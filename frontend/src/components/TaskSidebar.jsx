import React from "react";
import Button from "./Button";

function TaskSidebar({onStartAddTask, onSelectTask, selectedTaskId, tasks}) {
  return (
    <aside className="w-1/3 h-screen mt-8 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Tasks
      </h2>
      <div>
        <Button onClick={onStartAddTask}>
            + Create Task
        </Button>
      </div>
      <ul className="mt-8">
        {tasks.map((task) => {
            let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
            return (
            <li key={task._id}>
                <button onClick={() => onSelectTask(task._id)} className={cssClasses}>
                    {task.title}
                </button>
            </li>
            );
        }
        )}
      </ul>
    </aside>
  );
}

export default TaskSidebar;
