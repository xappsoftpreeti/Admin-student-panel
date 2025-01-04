import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/dashBoard';
import StudentDetails from './pages/studentDetails';
import StudentProfile from './pages/StudentProfile';
import ResultUpload from './pages/resultUpload';
import ResultPage from './pages/resultFormFillup';
import AdmitCard from './pages/admitCard';
import Sidebar from './components/sidebar';
import AdminProfilePage from './pages/adminProfile';
import GrievancePage from './pages/Grievance';
import ResultView from './pages/resultView';

const App = () => {
  // Check if the user is authenticated
  const isAuthenticated = () => localStorage.getItem('token') !== null;

  // Layout for pages with Sidebar
  const DashboardLayout = ({ children }) => (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect to Dashboard if logged in, else to login */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />}
        />

        {/* Protected Routes: Only accessible if authenticated */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Student-add"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <StudentDetails />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Student-profile"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <StudentProfile />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Result-Upload"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <ResultUpload />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Result-view"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <ResultView />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Result-Page"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <ResultPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Admitcard"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <AdmitCard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Admin Profile Route */}
        <Route
          path="/Adminprofile"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <AdminProfilePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/Adminprofile"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <AdminProfilePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/grievance"
          element={
            isAuthenticated() ? (
              <DashboardLayout>
                <GrievancePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;



