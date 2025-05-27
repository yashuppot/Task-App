import React, { useEffect, useState } from 'react';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("tried");
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl text-gray-800 font-bold mb-4">Task Dashboard</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <div className='flex gap-2'>
              <span className="inline-block mt-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                {task.status}
              </span>
              <span className="inline-block mt-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
