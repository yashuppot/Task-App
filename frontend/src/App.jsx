import { useEffect, useState } from "react";

import TaskSidebar from "./components/TaskSidebar";
import NoTaskSelected from "./components/NoTaskSelected";
import AddTask from "./components/AddTask";
import SelectedTask from "./components/SelectedTask";

function App() {
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
    content = <AddTask onCancel={handleCancelAddTask} />;
  } else {
    console.log(selectedTaskId);
    let selectedTask = tasks.find((task) => task._id === selectedTaskId);
    content = <SelectedTask onDelete={() => handleDeleteTask(selectedTaskId)} task={selectedTask} />;
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
