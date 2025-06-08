import React from "react";
import { NoTaskSelectedProps } from "../types";
import Button from "./Button";

function NoTaskSelected({ onStartAddTask }: NoTaskSelectedProps) {
  return (
    <div className="mt-24 text-center flex justify-center w-screen">
      <div>
        <h2 className="text-xl font-bold text-stone-500 my-4">
          No Task Selected
        </h2>
        <p className="text-stone-400 mb-4">
          Select a Task or get started with a new one
        </p>
        <p className="mt-8">
          <Button onClick={onStartAddTask}>Create New Task</Button>
        </p>
      </div>
    </div>
  );
}

export default NoTaskSelected; 