import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/slices/authSlice';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users.jsx';
import ChatRequests from './pages/ChatRequests';
import UserReports from './pages/UserReports';
import Subscriptions from './pages/Subscriptions';
import Settings from './pages/Settings';
import Help from './pages/Help';
import UserView from './pages/UserView';
import AdminLogin from './pages/AdminLogin';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


function App() {
  // const dispatch = useDispatch();

  // // useEffect(() => {
  // //   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTc0NDQ1NTg1MiwiZXhwIjoxNzQ0NDU5NDUyLCJpYXQiOjE3NDQ0NTU4NTJ9.0q_xJvs5dRve6Tj2N_57VlGAA9tyrXQWvoLmWzXJYcY';
  // //   dispatch(setCredentials({ accessToken }));
  // // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="user-view/:id" element={<UserView />} />
          <Route path="chat-requests" element={<ChatRequests />} />
          <Route path="user-reports" element={<UserReports />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;