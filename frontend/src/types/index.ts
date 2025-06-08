export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

// Component Props
export interface TaskSidebarProps {
  onSelectTask: (taskId: string) => void;
  onStartAddTask: () => void;
  tasks: Task[];
}

export interface NoTaskSelectedProps {
  onStartAddTask: () => void;
}

export interface AddTaskProps {
  onAdd: (taskData: TaskData) => void;
  onCancel: () => void;
}

export interface SelectedTaskProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

export interface EditTaskProps {
  task: Task;
  onCancel: () => void;
  onSave: (taskId: string, updatedData: Partial<TaskData>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
} 