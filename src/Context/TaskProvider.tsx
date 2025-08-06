// Context/TaskProvider.tsx

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types/types';
import { TaskContext } from './TaskContext';

type Props = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  // ✅ Removed toggleTask function as requested

  const updateTask = (id: number, updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      // ✅ Removed toggleTask from context value
      editingTask,
      setEditingTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};