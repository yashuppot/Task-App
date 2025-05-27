import { useEffect, useState } from "react";

import TaskSidebar from "./components/TaskSidebar";
import NoTaskSelected from "./components/NoTaskSelected";

function App() {
  const [selectedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

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
    content = <NoTaskSelected />
  }
  return (
    <div className="flex">
      <TaskSidebar tasks={tasks} />
      {content}
    </div>

  );
}

export default App;
