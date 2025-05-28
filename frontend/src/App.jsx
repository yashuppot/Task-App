import { useEffect, useState } from "react";

import TaskSidebar from "./components/TaskSidebar";
import NoTaskSelected from "./components/NoTaskSelected";
import AddTask from "./components/AddTask";

function App() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);


  function handleStartAddTask() {
    setSelectedTaskId(undefined);
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
    content = <NoTaskSelected onStartAddTask={handleStartAddTask}/>
  }
  else if(selectedTaskId === undefined) {
    content = <AddTask />
  }
  return (
    <div className="flex">
      <TaskSidebar onStartAddTask={handleStartAddTask} tasks={tasks} />
      {content}
    </div>

  );
}

export default App;
