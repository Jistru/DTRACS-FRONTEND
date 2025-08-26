// src/pages/Todo/Upcoming/Upcoming.jsx
import React from 'react';
import TaskTabs from '../../../components/TaskTabs/TaskTabs.jsx';
import CreateTask from '../../../components/CreateTask/CreateTask';
import { Link } from 'react-router-dom';
import './Upcoming.css';

//Ito
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upcoming = () => {
  const upcomingTasks = [
    { id: 1, title: "Project Proposal", time: "3:30 PM" },
    { id: 2, title: "Final Report Submission", time: "10:00 AM" },
    { id: 3, title: "Group Presentation", time: "1:15 PM" }
  ];

  const handleCreateTask = () => {
    alert("Create new task clicked!");
  };

  return (
    <div className="upcoming-app">
      <main className="upcoming-main">
        {/* Reusable Tabs */}
        <TaskTabs />

        {/* ✅ Create Task Button - Above Date Header */}
        <div style={{ marginBottom: '16px', display: 'inline-block' }}>
          <CreateTask onClick={handleCreateTask} />
        </div>

        {/* Date Header */}
        <div className="upcoming-date-header">
          August 5, 2025 <span className="upcoming-weekday">(Tuesday)</span>
        </div>

        {/* Task List */}
        {upcomingTasks.map(task => (
          <Link to={`/todo/task/${task.id}`} className="upcoming-task-link" key={task.id}>
            <div className="upcoming-card">
              <div className="upcoming-card-title">{task.title}</div>
              <div className="upcoming-card-time">Due at {task.time}</div>
            </div>
          </Link>
        ))}
      </main>

      {/*Isama to sa gagamitan ng Component pati ung nasa import*/}
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