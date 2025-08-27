// src/pages/Todo/Upcoming/Upcoming.jsx
import React, { useState } from 'react';
import TaskTabs from '../../../components/TaskTabs/TaskTabs.jsx';
import CreateTask from '../../../components/CreateTask/CreateTask';
import { Link } from 'react-router-dom';
import './Upcoming.css';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Helper: Format date as "August 5, 2025"
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const Upcoming = () => {
  // ✅ State: tasks with dynamic date
  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: 1,
      title: "Project Proposal",
      description: "Finalize the project scope and deliverables.",
      time: "3:30 PM",
      date: formatDate(new Date()) // Today
    },
    {
      id: 2,
      title: "Final Report Submission",
      description: "Submit the final report to the department.",
      time: "10:00 AM",
      date: formatDate(new Date())
    }
  ]);

  // ✅ Add new task with correct date from calendar
  const handleCreateTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      title: newTaskData.title || "Untitled Task",
      description: newTaskData.description || "No description",
      time: "TBD", // You can enhance this later
      date: newTaskData.formattedDate // Comes from TaskForm
    };

    // ✅ Add to tasks (newest first)
    setUpcomingTasks(prev => [newTask, ...prev]);
  };

  // ✅ Group tasks by date
  const groupedTasks = upcomingTasks.reduce((groups, task) => {
    const date = task.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(task);
    return groups;
  }, {});

  return (
    <div className="upcoming-app">
      <main className="upcoming-main">
        {/* Reusable Tabs */}
        <TaskTabs />

        {/* ✅ Pass handler to CreateTask */}
        <CreateTask onTaskCreated={handleCreateTask} />

        {/* Render tasks grouped by date */}
        {Object.keys(groupedTasks).map(date => (
          <React.Fragment key={date}>
            {/* ✅ Always show full date */}
            <div className="upcoming-date-header">
              {date}
            </div>

            {/* Task List for this date */}
            {groupedTasks[date].map(task => (
              <Link to={`/todo/task/${task.id}`} className="upcoming-task-link" key={task.id}>
                <div className="upcoming-card">
                  <div className="upcoming-card-title">{task.title}</div>
                  <div className="upcoming-card-description">
                    {task.description}
                  </div>
                  <div className="upcoming-card-time">Due at {task.time}</div>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </main>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Upcoming;