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
function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTc0MzkzMjg5MywiZXhwIjoxNzQzOTM2NDkzLCJpYXQiOjE3NDM5MzI4OTN9.iVJLt62albap4wQ-Yap77076Z3uugEH7PEHnF8HXcKQ';
    dispatch(setCredentials({ accessToken }));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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