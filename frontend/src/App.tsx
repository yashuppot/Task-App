import React, { useEffect, useState } from "react";

import TaskSidebar from "./components/TaskSidebar";
import NoTaskSelected from "./components/NoTaskSelected";
import AddTask from "./components/AddTask";
import SelectedTask from "./components/SelectedTask";
import EditTask from "./components/EditTask";
import { Task, TaskData } from "./types";

function App() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null | undefined>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleStartAddTask(): void {
    setSelectedTaskId(undefined);
  }

  function handleSelectTask(taskId: string): void {
    setSelectedTaskId(taskId);
  }

  function handleCancelAddTask(): void {
    setSelectedTaskId(null);
  }

  function handleStartEditTask(): void {
    setIsEditing(true);
  }

  function handleFinishEditTask(): void {
    setIsEditing(false);
  }

  async function handleStatusChange(taskId: string, newStatus: Task['status']): Promise<void> {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updatedTask: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Could not update status");
    }
  }

  async function handleSaveTaskEdits(taskId: string, updatedData: Partial<TaskData>): Promise<void> {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));

      setIsEditing(false);
    } catch (error) {
      alert("Failed to save edits.");
      console.error(error);
    }
  }

  async function handleAddTask(taskData: TaskData): Promise<void> {
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask: Task = await res.json();

      setTasks((prev) => [...prev, createdTask]);
      setSelectedTaskId(createdTask._id); // show new task immediately
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to create task. Please try again.");
    }
  }

  async function handleDeleteTask(taskId: string): Promise<void> {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task.");
      }

      // Remove from state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setSelectedTaskId(null); // return to "No Task Selected" view
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Something went wrong while deleting the task.");
    }
  }

  // Load all tasks on component mount via API call
  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  let content: React.JSX.Element; // Conditional content based on the editing state and selected task

  if (selectedTaskId === null) {
    content = <NoTaskSelected onStartAddTask={handleStartAddTask} />;
  } else if (selectedTaskId === undefined) {
    content = <AddTask onAdd={handleAddTask} onCancel={handleCancelAddTask} />;
  } else {
    let selectedTask = tasks.find((task) => task._id === selectedTaskId);

    if (isEditing && selectedTask) {
      content = (
        <EditTask
          task={selectedTask}
          onCancel={handleFinishEditTask}
          onSave={handleSaveTaskEdits}
        />
      );
    } else if (selectedTask) {
      content = (
        <SelectedTask
          task={selectedTask}
          onDelete={() => handleDeleteTask(selectedTaskId)}
          onEdit={handleStartEditTask}
          onStatusChange={handleStatusChange}
        />
      );
    } else {
      // Fallback if task not found
      content = <NoTaskSelected onStartAddTask={handleStartAddTask} />;
    }
  }
  
  return (
    <div className="flex">
      <TaskSidebar
        onSelectTask={handleSelectTask}
        onStartAddTask={handleStartAddTask}
        tasks={tasks}
      />
      {content}
    </div>
  );
}

export default App; 