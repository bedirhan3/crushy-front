import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats } from '../store/slices/dashboardSlice';
import LocationInfo from './LocationInfo';
function TopStats() {
    const dispatch = useDispatch();
    const { stats, isLoading } = useSelector((state) => state.dashboard);
    
    useEffect(() => {
        dispatch(fetchDashboardStats());
    }, [dispatch]);

    return (
        <div className="row g-4 mb-4">
            <div className="col-md-3">
                <div className="card h-100" style={{ background: 'linear-gradient(45deg, #FF9F43, #FFB976)', borderRadius: '12px', padding: '15px' }}>
                    <div className="card-body p-0 text-white">
                        <h5 className="mb-3 text-white opacity-90 fw-normal">Total Users</h5>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2 className="mb-0 fw-bold">{isLoading ? '...' : stats.totalUsers}</h2>
                                <p className="mb-0">users</p>
                                <small className="opacity-75">All registered users</small>
                            </div>
                            <div className="bg-dark bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-people fs-4 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card h-100" style={{ background: 'linear-gradient(45deg, #4B7BE5, #6B92E5)', borderRadius: '12px', padding: '15px' }}>
                    <div className="card-body p-0 text-white">
                        <h5 className="mb-3 text-white opacity-90 fw-normal">Blocked Users</h5>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2 className="mb-0 fw-bold">{isLoading ? '...' : stats.blockedUsers}</h2>
                                <p className="mb-0">users</p>
                                <small className="opacity-75">Currently blocked users</small>
                            </div>
                            <div className="bg-dark bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-person-x fs-4 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card h-100" style={{ background: 'linear-gradient(45deg, #38B6FF, #5CC4FF)', borderRadius: '12px', padding: '15px' }}>
                    <div className="card-body p-0 text-white">
                        <h5 className="mb-3 text-white opacity-90 fw-normal">Active Subscriptions</h5>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2 className="mb-0 fw-bold">{isLoading ? '...' : stats.activeSubscriptions}</h2>
                                <p className="mb-0">subscribers</p>
                                <small className="opacity-75">Current premium users</small>
                            </div>
                            <div className="bg-dark bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-star fs-4 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card h-100" style={{ background: 'linear-gradient(45deg, #4CAF50, #69C16C)', borderRadius: '12px', padding: '15px' }}>
                    <div className="card-body p-0 text-white">
                        <h5 className="mb-3 text-white opacity-90 fw-normal">Total Matches</h5>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2 className="mb-0 fw-bold">{isLoading ? '...' : stats.totalMatches}</h2>
                                <p className="mb-0">matches</p>
                                <small className="opacity-75">Successful connections</small>
                            </div>
                            <div className="bg-dark bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-heart fs-4 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopStats;    