import React, { useRef, useState } from "react";
import { EditTaskProps } from "../types";
import Input from "./Input";

function EditTask({ task, onCancel, onSave }: EditTaskProps) {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(): void {
    const updatedTitle = title.current?.value || "";
    const updatedDesc = description.current?.value || "";

    if (!updatedTitle.trim()) {
      setError("Title is required, please fill it in");
      return;
    }

    onSave(task._id, {
      title: updatedTitle,
      description: updatedDesc
    });
  }

  return (
    <div className="mx-8 w-[35rem] mt-16">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <p className="font-semibold">Invalid Input</p>
          <p>{error}</p>
        </div>
      )}

      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>

      <Input ref={title} label="Title" type="text" defaultValue={task.title} />
      <Input ref={description} label="Description" textarea defaultValue={task.description} />
    </div>
  );
}

export default EditTask; 