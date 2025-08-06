    import { useState } from 'react';
    import { useTaskContext } from '../Context/TaskContext';
    import '../CSS/TaskList.css';

    const TaskList = () => {
    const {
        tasks,
        deleteTask,
        setEditingTask
    } = useTaskContext();

    // Filter and sort state
    const [filterPriority, setFilterPriority] = useState('All');
    const [filterDateOption, setFilterDateOption] = useState('All'); // 'All', 'Overdue', 'Next7'
    const [sortBy, setSortBy] = useState('None'); // 'None', 'Priority', 'DueDate'
    const [sortOrder, setSortOrder] = useState('Asc'); // 'Asc' or 'Desc'

    const today = new Date();
    const next7 = new Date();
    next7.setDate(next7.getDate() + 7);

    // Compute visible tasks based on filters
    let visibleTasks = [...tasks];
    if (filterPriority !== 'All') {
        visibleTasks = visibleTasks.filter(task => task.priority === filterPriority);
    }
    if (filterDateOption === 'Overdue') {
        visibleTasks = visibleTasks.filter(task => new Date(task.dueDate) < today);
    } else if (filterDateOption === 'Next7') {
        visibleTasks = visibleTasks.filter(task => {
        const due = new Date(task.dueDate);
        return due >= today && due <= next7;
        });
    }

    // Sorting function
    if (sortBy === 'Priority') {
        const rank = { 'Low': 1, 'Medium': 2, 'High': 3 };
        visibleTasks.sort((a, b) => {
        return (rank[a.priority] - rank[b.priority]) * (sortOrder === 'Asc' ? 1 : -1);
        });
    } else if (sortBy === 'DueDate') {
        visibleTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate), dateB = new Date(b.dueDate);
        return (dateA.getTime() - dateB.getTime()) * (sortOrder === 'Asc' ? 1 : -1);
        });
    } 

    return (
        <div className="task-list">
        <h2>Task List</h2>

        {/* Filtering controls */}
        <div className="filters">
            <label htmlFor="filterPriority">Filter by Priority </label>
            <select
            id="filterPriority"
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>

            <label htmlFor='filterDateOption'>Filter by Due Date </label>
            <select
            id='filterDateOption'
            value={filterDateOption}
            onChange={e => setFilterDateOption(e.target.value)}
            >
            <option value="All">All</option>
            <option value="Overdue">Overdue</option>
            <option value="Next7">Next 7 Days</option>
            </select>
        </div>

        {/* Sorting controls */}
        <div className="sorting">
            <label htmlFor='sortBy'>Sort By </label>
            <select id='sortBy' value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="None">None</option>
            <option value="Priority">Priority</option>
            <option value="DueDate">Due Date</option>
            </select>

            <label htmlFor='sortOrder'>Order </label>
            <select id='sortOrder' value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="Asc">Ascending</option>
            <option value="Desc">Descending</option>
            </select>
        </div>

        {/* Task items */}
        <table>
            <thead>
            <tr>
                <th>Task Name</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {visibleTasks.length === 0 ? (
                <tr><td colSpan={5}>No tasks to display.</td></tr>
            ) : (
                visibleTasks.map(task => (
                <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.priority}</td>
                    <td>{task.description}</td>
                    <td>
                    <button onClick={() => setEditingTask(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
    };

    export default TaskList;