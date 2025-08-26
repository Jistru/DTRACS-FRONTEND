// src/components/TaskForm/TaskForm.jsx
import React, { useState } from 'react';
import { FiUpload } from "react-icons/fi";
import { IoMdLink } from "react-icons/io";
import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import './TaskForm.css';

// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    for: 'All schools',
    assignedTo: 'All accounts',
    dueDate: 'No due date',
    title: '',
    description: '',
    attachments: [],
    linkUrl: ''
  });

  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleFileUpload = (e) => {
    console.log('Files:', e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Show success toast instead of alert
    toast.success("Task created successfully!", {
      autoClose: 2000,
      hideProgressBar: false,
      position: "top-right",
      theme: "colored"
    });

    // Close modal after success
    onClose();
  };

  const toggleLinkInput = () => {
    setIsLinkInputVisible(prev => !prev);
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <button className="task-form-close" onClick={onClose}>×</button>

        <form onSubmit={handleSubmit} className="task-form">
          {/* Row 1: For, Assigned to, Due Date */}
          <div className="task-form-row">
            <div className="task-form-group">
              <label htmlFor="for">For</label>
              <select id="for" name="for" value={formData.for} onChange={handleChange}>
                <option>All schools</option>
                <option>Specific school</option>
              </select>
            </div>
            <div className="task-form-group">
              <label htmlFor="assignedTo">Assigned to</label>
              <select id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                <option>All accounts</option>
                <option>Specific user</option>
              </select>
            </div>
            <div className="task-form-group">
              <label htmlFor="dueDate">Due Date</label>
              <select id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange}>
                <option>No due date</option>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>Next week</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="task-form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="task-form-group">
            <label htmlFor="description">Description (optional)</label>
            <div className="description-container">
              <div className="task-form-text-toolbar">
                <button type="button" className="text-btn">
                  <HiMiniBold size={16} />
                </button>
                <button type="button" className="text-btn">
                  <FaItalic size={16} />
                </button>
                <button type="button" className="text-btn">
                  <FaUnderline size={16} />
                </button>
                <button type="button" className="text-btn">
                  <MdFormatListBulleted size={16} />
                </button>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="description-textarea"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Attach */}
          <div className="task-form-group">
            <label htmlFor="attach">Attach</label>
            <div className="task-form-attach">
              <div className="upload-link-container">
                {/* Upload Group */}
                <div className="upload-item">
                  <input
                    type="file"
                    id="upload"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button type="button" className="upload-circle" onClick={() => document.getElementById('upload').click()}>
                    <FiUpload size={20} />
                  </button>
                  <span className="upload-label">Upload</span>
                </div>

                {/* Link Group */}
                <div className="link-item">
                  <button type="button" className="link-circle" onClick={toggleLinkInput}>
                    <IoMdLink size={20} />
                  </button>
                  <span className="link-label">Link</span>
                </div>
              </div>
            </div>

            {/* Link Input Container (below attach) */}
            {isLinkInputVisible && (
              <div className="link-input-outer-container">
                <input
                  type="url"
                  placeholder="Paste or type link"
                  value={formData.linkUrl}
                  name="linkUrl"
                  onChange={handleChange}
                  className="link-input"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="assign-btn">Assign</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;