import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopStats from './TopStats';

function Layout() {
    const location = useLocation();
    const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/dashboard' || location.pathname === '/admin/';

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 pagee" style={{ backgroundColor: '#1E1E2D', minHeight: '100vh' }}>
                <div className="p-4">
                    {isDashboard && <TopStats />}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout; 