import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./Context/TaskProvider";
import "./App.css"; 

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <h2>Task Manager</h2>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
