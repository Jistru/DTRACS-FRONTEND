// src/pages/ManageAccount/ManageAccount.jsx
import React, { useState, useRef } from 'react';
import { FaUserEdit } from "react-icons/fa"; // Added FaUserEdit
import { FaCirclePlus } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import './ManageAccount.css';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAccount = () => {
  const [isEditing, setIsEditing] = useState(false); // Controls edit mode
  const [showNameForm, setShowNameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const fileInputRef = useRef(null);

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "Juan",
    middleName: "Juan",
    lastName: "Dela Cruz",
    email: "example@deped.edu.ph",
    contactNumber: "+63 9123456789"
  });

  // Temp fields for unsaved changes
  const [tempName, setTempName] = useState({ firstName: "", middleName: "", lastName: "" });
  const [tempEmail, setTempEmail] = useState("");
  const [tempContact, setTempContact] = useState("");

  // Initialize temp fields
  const openNameForm = () => {
    setTempName({ ...userData });
    setShowNameForm(true);
  };

  const openEmailForm = () => {
    setTempEmail(userData.email);
    setShowEmailForm(true);
  };

  const openContactForm = () => {
    setTempContact(userData.contactNumber);
    setShowContactForm(true);
  };

  // Check for unsaved changes
  const hasNameChanges = () =>
    tempName.firstName !== userData.firstName ||
    tempName.middleName !== userData.middleName ||
    tempName.lastName !== userData.lastName;

  const hasEmailChanges = () => tempEmail !== userData.email;
  const hasContactChanges = () => tempContact !== userData.contactNumber;

  const hasAnyUnsaved = () =>
    hasNameChanges() || hasEmailChanges() || hasContactChanges();

  // Confirm discard
  const confirmDiscard = (hasChanges, onClose) => {
    if (!hasChanges || window.confirm("You have unsaved changes. Are you sure you want to discard them?")) {
      onClose();
    }
  };

  // Save handlers
  const handleSaveName = () => {
    if (tempName.firstName.trim() && tempName.lastName.trim()) {
      setUserData(prev => ({
        ...prev,
        firstName: tempName.firstName,
        middleName: tempName.middleName,
        lastName: tempName.lastName
      }));
      toast.success("Name updated!");
      setShowNameForm(false);
    } else {
      toast.warn("Please fill in required fields.");
    }
  };

  const handleSaveEmail = () => {
    if (tempEmail.includes("@")) {
      setUserData(prev => ({ ...prev, email: tempEmail }));
      toast.success("Email updated!");
      setShowEmailForm(false);
    } else {
      toast.warn("Please enter a valid email.");
    }
  };

  const handleSaveContact = () => {
    if (tempContact.trim()) {
      setUserData(prev => ({ ...prev, contactNumber: tempContact }));
      toast.success("Contact updated!");
      setShowContactForm(false);
    } else {
      toast.warn("Please enter a contact number.");
    }
  };

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPG, PNG, GIF)");
        e.target.value = '';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large. Max 5MB allowed.");
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        toast.info("Profile picture updated!", { autoClose: 1500 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing && hasAnyUnsaved()) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to exit edit mode?");
      if (!confirmed) return;
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="manage-account-app">
      <main className="manage-account-main">
        {/* Profile Section */}
        <div className="profile-section">
          {/* Profile Avatar */}
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {avatar ? (
                <img src={avatar} alt="Profile" className="avatar-image" />
              ) : (
                <MdAccountCircle size={120} />
              )}
            </div>
            {/* Only show "Change" button in edit mode */}
            {isEditing && (
              <>
                <button className="change-avatar-btn" onClick={handleButtonClick}>
                  <FaCirclePlus size={16} color="#2196F3" /> Change
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </>
            )}
          </div>

          {/* Profile Info Card */}
          <div className="profile-info-card">
            {/* Edit Icon - Top Right Inside Card */}
            <div className="edit-icon-wrapper">
              {!isEditing ? (
                <button className="edit-icon-button" onClick={toggleEditMode} aria-label="Edit Profile">
                  <FaUserEdit size={20} color="#2196F3" />
                </button>
              ) : (
                <button className="edit-done-button" onClick={toggleEditMode}>
                  Done
                </button>
              )}
            </div>

            <h2 className="profile-title">PROFILE INFORMATION</h2>
            <div className="profile-details">
              <div className="profile-row">
                <span className="label">Name:</span>
                <span className="value">{userData.firstName} {userData.middleName} {userData.lastName}</span>
              </div>
              <div className="profile-row">
                <span className="label">Email:</span>
                <span className="value">{userData.email}</span>
              </div>
              <div className="profile-row">
                <span className="label">Contact Number:</span>
                <span className="value">{userData.contactNumber}</span>
              </div>
              <div className="profile-row">
                <span className="label">Position:</span>
                <span className="value">Principal</span>
              </div>
              <div className="profile-row">
                <span className="label">School:</span>
                <span className="value">Binan Integrated National High School</span>
              </div>
              <div className="profile-row">
                <span className="label">School Address:</span>
                <span className="value">Nong Sto. Domingo, Biñan City, Laguna, 4024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Links - Only show in edit mode */}
        {isEditing && (
          <div className="edit-links">
            {/* Change Name */}
            <div className={`edit-link ${showNameForm ? 'show-form' : ''}`}>
              <button
                className="edit-link-button"
                onClick={() => confirmDiscard(hasNameChanges(), () => {
                  setShowNameForm(!showNameForm);
                  if (!showNameForm) openNameForm();
                })}
              >
                <span>Change your name</span>
                <span className="arrow">{showNameForm ? '▼' : '▶'}</span>
              </button>
              <div className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      value={tempName.firstName}
                      onChange={(e) => setTempName(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Juan"
                    />
                  </div>
                  <div className="form-group">
                    <label>Middle Name:</label>
                    <input
                      type="text"
                      value={tempName.middleName}
                      onChange={(e) => setTempName(prev => ({ ...prev, middleName: e.target.value }))}
                      placeholder="Twoo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      value={tempName.lastName}
                      onChange={(e) => setTempName(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Dela Cruz"
                    />
                  </div>
                </div>
                <button className="save-btn" onClick={handleSaveName}>
                  Save
                </button>
              </div>
            </div>

            {/* Change Email */}
            <div className={`edit-link ${showEmailForm ? 'show-form' : ''}`}>
              <button
                className="edit-link-button"
                onClick={() => confirmDiscard(hasEmailChanges(), () => {
                  setShowEmailForm(!showEmailForm);
                  if (!showEmailForm) openEmailForm();
                })}
              >
                <span>Change your email</span>
                <span className="arrow">{showEmailForm ? '▼' : '▶'}</span>
              </button>
              <div className="edit-form">
                <div className="form-group">
                  <label>Email Address:</label>
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="example@deped.edu.ph"
                  />
                </div>
                <button className="save-btn" onClick={handleSaveEmail}>
                  Save
                </button>
              </div>
            </div>

            {/* Change Contact */}
            <div className={`edit-link ${showContactForm ? 'show-form' : ''}`}>
              <button
                className="edit-link-button"
                onClick={() => confirmDiscard(hasContactChanges(), () => {
                  setShowContactForm(!showContactForm);
                  if (!showContactForm) openContactForm();
                })}
              >
                <span>Change contact no.</span>
                <span className="arrow">{showContactForm ? '▼' : '▶'}</span>
              </button>
              <div className="edit-form">
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input
                    type="tel"
                    value={tempContact}
                    onChange={(e) => setTempContact(e.target.value)}
                    placeholder="+63 9123456789"
                  />
                </div>
                <button className="save-btn" onClick={handleSaveContact}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="manage-account-footer">
        <p className="footer-text">
          School Governance and Operations Management | Terms of Use | Privacy Statement | Version 1.2025
        </p>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default ManageAccount;