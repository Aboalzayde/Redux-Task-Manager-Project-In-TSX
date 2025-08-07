export interface Task {
  id: number;
  name: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  completed: boolean;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: number, task: Task) => void;
  deleteTask: (id: number) => void;
  // ✅ Removed toggleTask as requested
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

export type InputType = 'text' | 'date' | 'select' | 'textarea' | 'checkbox';
export type PriorityFormType = '' | 'Low' | 'Medium' | 'High';

// ✅ Simple interface instead of Record<string, boolean>
export interface TouchedFields {
  name?: boolean;
  dueDate?: boolean;
  priority?: boolean;
  description?: boolean;
}

export interface ReusableInputProps {
  type: InputType;
  name: string;
  label: string;
  value: string | boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  options?: string[];
  required?: boolean;
}
