// src/components/TaskActions/TaskActions.jsx
import React from 'react';
import './TaskActions.css';

// Icons
import { FaPaperclip } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";

// Components
import SharedButton from '../SharedButton/SharedButton';

const TaskActions = ({ onFileChange, onComplete, isCompleted }) => {
  return (
    <div className="task-actions">
      {/* Add File Button */}
      <label htmlFor="file-upload" className="task-actions-file-label">
        <SharedButton
          variant="default"
          size="medium"
          as="div"
          style={{
            width: 'auto',
            justifyContent: 'center',
            padding: '8px 16px',
            background: '#f9f9f9',
            border: '1px solid #ccc',
            color: '#000',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          <FaPaperclip style={{ marginRight: '8px', width: '14px', height: '14px' }} />
          Add file
        </SharedButton>
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={onFileChange}
        style={{ display: 'none' }}
        disabled={isCompleted}
      />

      {/* Complete Button */}
      {!isCompleted ? (
        <SharedButton
          variant="primary"
          size="medium"
          onClick={onComplete}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            transition: 'background-color 0.2s ease'
          }}
        >
          <MdOutlineDoneOutline style={{ marginRight: '8px', width: '16px', height: '16px' }} />
          Complete
        </SharedButton>
      ) : (
        <div className="task-action-item completed">
          <MdOutlineDoneOutline style={{ marginRight: '8px', width: '16px', height: '16px' }} />
          Completed
        </div>
      )}
    </div>
  );
};

export default TaskActions;