import React, { useRef, useState } from "react";
import Input from "./Input";

function NewTask({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();

  const [errorMessage, setErrorMessage] = useState(null);

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;

    if (
      enteredTitle.trim() === ""
    ) {
      setErrorMessage("Title is required, please fill it in");
      return;
    }

    setErrorMessage(null); // clear error
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
    });
  }

  return (
    <div className=" mx-8 w-[35rem] mt-16">
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <p className="font-semibold">Invalid Input</p>
          <p>{errorMessage}</p>
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
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>

      <div>
        <Input type="text" ref={title} label="Project Name" />
        <Input ref={description} label="Description" textarea />

      </div>
    </div>
  );
}

export default NewTask;

