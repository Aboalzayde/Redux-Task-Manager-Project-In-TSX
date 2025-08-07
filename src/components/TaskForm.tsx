// src/components/TaskForm.tsx
import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';
import '../CSS/TaskForm.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../Redux/Store';
import { addTask, updateTask, setEditingTask } from '../Redux/taskSlice';
import type { Task, PriorityFormType, TouchedFields } from '../types/types';
import ReusableInput from './Inputs/ReusableInput';

interface FormTask {
  name: string;
  dueDate: string;
  priority: PriorityFormType;
  description: string;
  completed: boolean;
}

const initialFormState: FormTask = {
  name: '',
  dueDate: '',
  priority: '',
  description: '',
  completed: false
};

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const editingTask = useSelector((state: RootState) => state.task.editingTask);

  const [formData, setFormData] = useState<FormTask>(initialFormState);
  const [touched, setTouched] = useState<TouchedFields>({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name,
        dueDate: editingTask.dueDate,
        priority: editingTask.priority,
        description: editingTask.description,
        completed: editingTask.completed
      });
    } else {
      setFormData(initialFormState);
    }
    setTouched({});
  }, [editingTask]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const { checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Task name is required';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Task name must be at least 3 characters';
    }

    if (!formData.dueDate) {
      errors.dueDate = 'Due date is required';
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.dueDate);
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (!formData.priority || !['Low', 'Medium', 'High'].includes(formData.priority)) {
      errors.priority = 'Please select a priority level';
    }

    if (formData.description && formData.description.length > 200) {
      errors.description = 'Description cannot exceed 200 characters';
    }

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      dueDate: true,
      priority: true,
      description: true
    });

    if (!isValid) return;

    const safePriority = formData.priority as 'Low' | 'Medium' | 'High';

    const taskPayload: Task = {
      ...formData,
      priority: safePriority,
      id: editingTask ? editingTask.id : Date.now()
    };

    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, updatedTask: taskPayload }));
      dispatch(setEditingTask(null));
    } else {
      dispatch(addTask(taskPayload));
      setFormData(initialFormState);
      setTouched({});
    }
  };

  const handleCancel = () => {
    dispatch(setEditingTask(null));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <ReusableInput
        type="text"
        name="name"
        label="Task Name"
        value={formData.name}
        placeholder="Enter task name"
        onChange={handleChange}
        onBlur={handleBlur}
        touched={!!touched.name}
        error={errors.name}
        required
      />
      <ReusableInput
        type="date"
        name="dueDate"
        label="Due Date"
        value={formData.dueDate}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={!!touched.dueDate}
        error={errors.dueDate}
        required
      />
      <ReusableInput
        type="select"
        name="priority"
        label="Priority"
        value={formData.priority}
        placeholder="-- Select Priority --"
        options={['Low', 'Medium', 'High']}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={!!touched.priority}
        error={errors.priority}
        required
      />
      <ReusableInput
        type="textarea"
        name="description"
        label="Description"
        value={formData.description}
        placeholder="Enter description (optional)"
        onChange={handleChange}
        onBlur={handleBlur}
        touched={!!touched.description}
        error={errors.description}
      />

      <div className="form-buttons">
        <button type="submit" disabled={!isValid} className="submit-button">
          {editingTask ? 'Save Changes' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;