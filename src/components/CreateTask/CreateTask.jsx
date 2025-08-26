// src/components/CreateTask/CreateTask.jsx
import React from 'react';
import { FaPlus } from "react-icons/fa6";
import './CreateTask.css';
import TaskForm from '../TaskForm/TaskForm'; // Import modal

const CreateTask = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="create-task-btn" onClick={handleCreateClick}>
        <FaPlus className="plus-icon" />
        <span className="create-text">Create</span>
      </button>

      {isModalOpen && <TaskForm onClose={closeModal} />}
    </>
  );
};

export default CreateTask;