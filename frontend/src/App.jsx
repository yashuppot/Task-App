import { useEffect } from 'react';

function App() {
  const API_BASE = 'http://localhost:5000/tasks';

  const createTask = async () => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Sample Task',
        description: 'Testing POST',
        status: 'To Do',
      }),
    });
    const data = await res.json();
    console.log('Created:', data);
  };

  const getAllTasks = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    console.log('All Tasks:', data);
  };

  const getTaskById = async () => {
    const id = prompt('Enter task ID to GET:');
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    console.log('Task by ID:', data);
  };

  const updateTask = async () => {
    const id = prompt('Enter task ID to UPDATE:');
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'In Progress',
      }),
    });
    const data = await res.json();
    console.log('Updated:', data);
  };

  const deleteTask = async () => {
    const id = prompt('Enter task ID to DELETE:');
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log('Deleted:', data);
  };

  return (
    <div className="p-6 flex flex-col items-center w-screen space-y-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-black font-bold">Task API Tester</h1>
      <div className="flex min-w-2/3 flex-col gap-2 space-y-2">
        <button onClick={createTask} className="bg-blue-500 text-white px-4 py-2 rounded">POST - Create Task</button>
        <button onClick={getAllTasks} className="bg-green-500 text-white px-4 py-2 rounded">GET - All Tasks</button>
        <button onClick={getTaskById} className="bg-yellow-500 text-white px-4 py-2 rounded">GET - Task by ID</button>
        <button onClick={updateTask} className="bg-purple-500 text-white px-4 py-2 rounded">PUT - Update Task</button>
        <button onClick={deleteTask} className="bg-red-500 text-white px-4 py-2 rounded">DELETE - Delete Task</button>
      </div>
    </div>
  );
}

export default App;
