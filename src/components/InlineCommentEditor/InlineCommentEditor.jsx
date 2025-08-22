// src/components/InlineCommentEditor/InlineCommentEditor.jsx
import React, { useRef, useEffect } from 'react';
import './InlineCommentEditor.css';

// Icons
import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";

const InlineCommentEditor = ({ value, onChange, onSave, onCancel }) => {
  const textareaRef = useRef(null);

  // Auto-resize on mount and value change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleInput = (e) => {
    onChange(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="inline-comment-editor">
      <textarea
        ref={textareaRef}
        value={value}
        onInput={handleInput}
        className="inline-comment-editor-input"
        placeholder="Edit your comment..."
      />

      <div className="inline-comment-editor-toolbar">
        <button type="button" className="format-btn"><HiMiniBold /></button>
        <button type="button" className="format-btn"><FaItalic /></button>
        <button type="button" className="format-btn"><FaUnderline /></button>
        <button type="button" className="format-btn"><FaEllipsisV /></button>
      </div>

      <div className="inline-comment-editor-actions">
        <button
          type="button"
          className="inline-comment-editor-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-comment-editor-save"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default InlineCommentEditor;