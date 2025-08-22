// src/pages/Todo/PastDue/PastDue.jsx
import React from 'react';
import TaskTabs from '../../../components/TaskTabs/TaskTabs.jsx';
import { Link } from 'react-router-dom'; // Import Link
import './PastDue.css';

const PastDue = () => {
  // Mock past due tasks
  const pastDueTasks = [
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
    <div className="pastdue-app">
      <main className="pastdue-main">
        {/* Reusable Tabs */}
        <TaskTabs />

        {/* Date Header */}
        <div className="pastdue-date-header">
          August 5, 2025 <span className="pastdue-weekday">Due 3 days ago</span>
        </div>

        {/* Task List */}
        {pastDueTasks.map(task => (
          <Link to={`/todo/task/${task.id}`} className="pastdue-task-link" key={task.id}>
            <div className="pastdue-card">
              <div className="pastdue-card-title">{task.title}</div>
              <div className="pastdue-card-time">Due at {task.time}</div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default PastDue;