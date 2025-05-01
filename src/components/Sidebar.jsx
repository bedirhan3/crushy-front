import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import './Sidebar.css';

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // Sayfa yönlendirmesini engelle
        dispatch(logout()); // Redux state'ini temizle
        navigate('/login'); // Login sayfasına yönlendir
    };

    return (
        <div className="sidebar" style={{ minWidth: '250px', minHeight: '100vh', backgroundColor: '#1a1a27' }}>
            <div className="p-3">
                <h3 className="text-danger mb-4">CRUSHY</h3>

                <div className="menu-section">
                    <small className="text-muted">MENU</small>
                    <nav className="nav flex-column mt-2">
                        <NavLink to="dashboard" className="nav-link text-white">
                            <i className="bi bi-grid me-2"></i> Dashboard
                        </NavLink>
                        <NavLink to="users" className="nav-link text-white">
                            <i className="bi bi-people me-2"></i> Users
                        </NavLink>
                        <NavLink to="chat-requests" className="nav-link text-white">
                            <i className="bi bi-chat me-2"></i> Chat Requests
                        </NavLink>
                        <NavLink to="user-reports" className="nav-link text-white">
                            <i className="bi bi-file-text me-2"></i> User Reports
                        </NavLink>
                        <NavLink to="subscriptions" className="nav-link text-white">
                            <i className="bi bi-star me-2"></i> Subscriptions
                        </NavLink>
                    </nav>
                </div>

                <div className="menu-section mt-4">
                    <small className="text-muted">SUPPORT</small>
                    <nav className="nav flex-column mt-2">
                        <NavLink to="/settings" className="nav-link text-white">
                            <i className="bi bi-gear me-2"></i> Settings
                        </NavLink>
                        <NavLink to="/help" className="nav-link text-white">
                            <i className="bi bi-question-circle me-2"></i> Help
                        </NavLink>
                        <NavLink to="#" className="nav-link text-white" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Sidebar; 