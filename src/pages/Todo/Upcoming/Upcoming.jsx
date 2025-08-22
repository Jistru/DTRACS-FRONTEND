// src/pages/Todo/Upcoming/Upcoming.jsx
import React from 'react';
import TaskTabs from '../../../components/TaskTabs/TaskTabs.jsx';
import { Link } from 'react-router-dom';
import './Upcoming.css';

const Upcoming = () => {
  // Mock upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: "Project Proposal",
      time: "3:30 PM"
    },
    {
      id: 2,
      title: "Final Report Submission",
      time: "10:00 AM"
    },
    {
      id: 3,
      title: "Group Presentation",
      time: "1:15 PM"
    }
  ];

  return (
    <div className="upcoming-app">
      <main className="upcoming-main">
        {/* Reusable Tabs */}
        <TaskTabs />

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
    </div>
  );
};

export default Upcoming;