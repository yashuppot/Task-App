import React from "react";

function SelectedTask({ task, onDelete, onEdit}) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="w-[35rem] mx-8 mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {task.title}
          </h1>
          <div className="flex gap-4">

          <button
            onClick={onEdit}
            className="text-stone-600 hover:text-stone-950 ml-4"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-stone-600 hover:text-stone-950"
          >
            Delete
          </button>
          </div>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{task.description}</p>
      </header>
    </div>
  );
}

export default SelectedTask;
