import React from "react";
import { SelectedTaskProps } from "../types";

function SelectedTask({ task, onDelete, onEdit, onStatusChange }: SelectedTaskProps) {
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    onStatusChange(task._id, e.target.value as 'pending' | 'in-progress' | 'completed');
  }

  return (
    <div className="w-[35rem] mx-8 mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {task.title}
          </h1>
          <div>
            <button
              onClick={onDelete}
              className="text-stone-600 hover:text-stone-950"
            >
              Delete
            </button>
            <button
              onClick={onEdit}
              className="ml-4 text-stone-600 hover:text-stone-950"
            >
              Edit
            </button>
          </div>
        </div>
        <p className="mb-2 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap mb-4">
          {task.description}
        </p>

        <label className="block text-stone-500 text-sm font-semibold mb-1">
          Status
        </label>
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="border mt-2 mb-4 h-10 rounded p-2 bg-stone-100 text-stone-800"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </header>
    </div>
  );
}

export default SelectedTask; 