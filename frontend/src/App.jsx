import { useEffect } from 'react';
import TaskDashboard from './components/TaskDashboard';

function App() {
  return (
    <div className="p-6 flex flex-col items-center w-screen space-y-4 bg-gray-100 min-h-screen">
      <TaskDashboard/>
    </div>
  );
}

export default App;
