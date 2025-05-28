import { useEffect, useState } from "react";

import TaskSidebar from "./components/TaskSidebar";
import NoTaskSelected from "./components/NoTaskSelected";
import AddTask from "./components/AddTask";
import SelectedTask from "./components/SelectedTask";
import EditTask from "./components/EditTask";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

  function handleStartAddTask() {
    setSelectedTaskId(undefined);
  }

  function handleSelectTask(taskId) {
    console.log(taskId);
    setSelectedTaskId(taskId);
  }

  function handleCancelAddTask() {
    setSelectedTaskId(null);
  }

  function handleStartEditTask() {
    setIsEditing(true);
  }

  function handleFinishEditTask() {
    setIsEditing(false);
  }

  async function handleSaveTaskEdits(taskId, updatedData) {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));

      setIsEditing(false);
    } catch (error) {
      alert("Failed to save edits.");
      console.error(error);
    }
  }

  async function handleAddTask(taskData) {
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

      const createdTask = await res.json();

      setTasks((prev) => [...prev, createdTask]);
      setSelectedTaskId(createdTask._id); // show new task immediately
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to create task. Please try again.");
    }
  }

  async function handleDeleteTask(taskId) {
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("tried");
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  let content;
  if (selectedTaskId === null) {
    content = <NoTaskSelected onStartAddTask={handleStartAddTask} />;
  } else if (selectedTaskId === undefined) {
    content = <AddTask onAdd={handleAddTask} onCancel={handleCancelAddTask} />;
  } else {
    let selectedTask = tasks.find((task) => task._id === selectedTaskId);

    if (isEditing) {
      content = (
        <EditTask
          task={selectedTask}
          onCancel={handleFinishEditTask}
          onSave={handleSaveTaskEdits}
        />
      );
    } else {
      content = (
        <SelectedTask
          task={selectedTask}
          onDelete={() => handleDeleteTask(selectedTaskId)}
          onEdit={handleStartEditTask}
        />
      );
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
