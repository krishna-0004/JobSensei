import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AuthSuccess from "./components/AuthSuccess"

import AdminDashboard from './components/Admin/AdminDashboard';
import IntanDashboard from './components/Intan/IntanDashboard';
import MentorDashboard from './components/Mentor/MentorDashboard';
import RecruiterDashboard from './components/Recruiter/RecruiterDashboard';
import CommonProfileForm from './components/Onboarding/CommonInfoForm';
import RoleSelectionPage from './components/Onboarding/RoleSelection';
import MentorForm from './components/Onboarding/MentorForm';
import RecruiterForm from './components/Onboarding/RecruiterForm';
import PendingPage from './components/Onboarding/PendingPage';

import ProtectedRoute from './utils/ProtectedRoute'; // Assuming this is already created

function App() {
  const location = useLocation();
  const hideNavAndFooterRoutes = ['/', '/login', '/common-profile', '/select-role','/mentor-from', '/recruiter-form', '/mentor-pending'];



  return (


    <>

      {!hideNavAndFooterRoutes.includes(location.pathname) && <Navbar />}


      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/common-profile" element={<CommonProfileForm />} />

        {/* Role-specific Forms */}
        <Route path="/mentor-from" element={<MentorForm />} />
        <Route path="/recruiter-form" element={<RecruiterForm />} />
        <Route path="/mentor-pending" element={<PendingPage />} />

        {/* Protected dashboards by role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intan"
          element={
            <ProtectedRoute allowedRole="intan">
              <IntanDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute allowedRole="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>


    </>

  );
}

export default App;
