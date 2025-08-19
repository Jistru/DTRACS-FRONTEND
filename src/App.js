import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import StartUp from "./pages/StartUp/StartUp";
import Login from "./pages/Login/Login";
import RegisterSchool from "./pages/Regsiter/RegisterSchool";
import RegisterOffice from "./pages/Regsiter/RegisterOffice";
import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Upcoming/Upcoming";
import PastDue from "./pages/Todo/PastDue/PastDue";
import Completed from "./pages/Todo/Completed/Completed";
import TaskDetail from "./pages/Todo/TaskDetail/TaskDetail";
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import SGOD from "./pages/SGOD/SGOD";
import PlanningResearch from "./pages/SGOD/PlanningResearch/PlanningResearch";
import SMME from "./pages/SGOD/SMME/SMME";
import HRD from "./pages/SGOD/HRD/HRD";
import SchoolHealth from "./pages/SGOD/SchoolHealth/SchoolHealth";
import EducationFacilities from "./pages/SGOD/EducationFacilities/EducationFacilities";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public routes */}
      <Route path="/" element={<StartUp />} />
      <Route path="/login/school" element={<Login />} />
      <Route path="/login/office" element={<Login />} />
      <Route path="/register/school" element={<RegisterSchool />} />
      <Route path="/register/office" element={<RegisterOffice />} />

      {/* Protected layout: Home + Content */}
      <Route element={<Home />}>
        <Route path="/home" element={<Dashboard />} />

        <Route path="/SGOD" element={<SGOD />} />
        <Route path="/SGOD/SMME" element={<SMME />} />
        <Route path="/SGOD/planning-research" element={<PlanningResearch />} />
        <Route path="/SGOD/HRD" element={<HRD />} />
        <Route path="/SGOD/school-health" element={<SchoolHealth />} />
        <Route path="/SGOD/education-facilities" element={<EducationFacilities />} />

        {/* Todo routes */}
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/upcoming" element={<Todo />} />
        <Route path="/todo/past-due" element={<PastDue />} />
        <Route path="/todo/completed" element={<Completed />} />
        <Route path="/todo/task/:id" element={<TaskDetail />} />
        
        {/* Manage Account */}
        <Route path="/manage-account" element={<ManageAccount />} />
      </Route>
    </Routes>
  );
}

export default App;