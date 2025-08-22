// src/components/CommentList/CommentList.jsx
import React, { useRef, useEffect } from 'react';
import './CommentList.css';

// Icons
import { FaEdit, FaTrash, FaSave, FaEllipsisV } from "react-icons/fa";
import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";

// Hook
import useClickOutside from '../../hooks/useClickOutside';

const CommentList = ({
  comments,
  editingId,
  editText,
  setEditText,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete
}) => {
  const menuRef = useRef(null);
  const editTextareaRef = useRef(null);
  const [moreMenuId, setMoreMenuId] = React.useState(null);

  // Close dropdown when clicking outside
  useClickOutside(menuRef, () => {
    setMoreMenuId(null);
  });

  // Auto-resize on edit start and text change
  useEffect(() => {
    if (editingId !== null && editTextareaRef.current) {
      editTextareaRef.current.style.height = 'auto';
      editTextareaRef.current.style.height = `${editTextareaRef.current.scrollHeight}px`;
    }
  }, [editingId, editText]);

  return (
    <div className="comments-container">
      {comments.map((c) => (
        <div key={c.id} className="comment-item">
          {/* Avatar */}
          <div className="comment-avatar">
            {c.author.charAt(0)}
          </div>

          <div className="comment-content" ref={menuRef}>
            {/* Header */}
            <div className="comment-header">
              <span className="comment-author">{c.author}</span>
              <span className="comment-time">{c.time}</span>
              <button
                className="comment-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreMenuId(moreMenuId === c.id ? null : c.id);
                }}
                title="More options"
              >
                <FaEllipsisV size={14} />
              </button>
            </div>

            {/* Inline Edit Mode */}
            {editingId === c.id ? (
              <div className="taskdetail-edit-container">
                <textarea
                  ref={editTextareaRef}
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                    // Auto-resize as you type
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  className="taskdetail-edit-input"
                  placeholder="Edit your comment..."
                />
                <div className="taskdetail-edit-toolbar">
                  <button type="button" className="taskdetail-format-btn"><HiMiniBold /></button>
                  <button type="button" className="taskdetail-format-btn"><FaItalic /></button>
                  <button type="button" className="taskdetail-format-btn"><FaUnderline /></button>
                  <button type="button" className="taskdetail-format-btn"><FaEllipsisV /></button>
                </div>
                <div className="taskdetail-edit-actions">
                  <button
                    className="taskdetail-edit-cancel"
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="taskdetail-edit-save"
                    onClick={onSaveEdit}
                  >
                    <FaSave size={14} style={{ marginRight: '6px' }} />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="comment-text">{c.text}</div>
                {c.isEdited && (
                  <span className="comment-edited-label"> (edited)</span>
                )}
              </>
            )}

            {/* Dropdown Menu */}
            {moreMenuId === c.id && (
              <div className="comment-menu-dropdown">
                <button
                  className="comment-menu-item"
                  onClick={() => {
                    setMoreMenuId(null);
                    onEdit(c);
                  }}
                >
                  <FaEdit size={12} style={{ marginRight: '8px' }} /> Edit
                </button>
                <button
                  className="comment-menu-item"
                  onClick={() => {
                    setMoreMenuId(null);
                    onDelete(c.id);
                  }}
                >
                  <FaTrash size={12} style={{ marginRight: '8px' }} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;