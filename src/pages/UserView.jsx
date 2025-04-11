import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../store/slices/generalSlice';
import LocationInfo from '../components/LocationInfo';

function UserView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser, isLoadingUser } = useSelector((state) => state.general);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [id, dispatch]);

  if (isLoadingUser) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container-fluid p-0">
        <div className="card">
          <div className="card-body text-center">
            <h4 className="text-white mb-3">User not found</h4>
            <Link to="/users" className="btn btn-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Engagement score badge rengi
  const getEngagementBadgeClass = (category) => {
    switch(category) {
      case 'High': return 'bg-success';
      case 'Medium': return 'bg-warning';
      case 'Low': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Abonelik badge rengi
  const getSubscriptionBadgeClass = (status, planName) => {
    if (status !== 'active') return 'bg-danger';
    
    switch(planName) {
      case 'Premium': return 'bg-warning';
      case 'EVO': return 'bg-success';
      case 'Basic': return 'bg-info';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-white mb-0">User Profile</h4>
        <Link to="/users" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Users
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          {/* User Profile Card */}
          <div className="card h-100">
            <div className="card-body">
              <div className="text-center mb-4">
                <div 
                  className="mx-auto rounded-circle mb-3 position-relative"
                  style={{
                    width: '150px',
                    height: '150px',
                    backgroundImage: `url(${currentUser.profile.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!currentUser.profile.imageUrl && (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-dark rounded-circle">
                      <i className="bi bi-person text-white fs-1"></i>
                    </div>
                  )}
                  
                  {currentUser.role === 'VerifiedUser' && (
                    <span className="position-absolute bottom-0 end-0 badge bg-primary rounded-circle p-2">
                      <i className="bi bi-patch-check-fill fs-5"></i>
                    </span>
                  )}
                </div>
                <h4 className="text-white mb-1">{currentUser.fullName}</h4>
                <p className="text-muted mb-2">@{currentUser.username}</p>
                <span className={`badge ${
                  currentUser.role === 'Admin' ? 'bg-danger' :
                  currentUser.role === 'VerifiedUser' ? 'bg-success' : 'bg-secondary'
                } mb-3`}>
                  {currentUser.role}
                </span>
                
                <div className="d-flex justify-content-center gap-2 mb-3">
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                  <button className="btn btn-sm btn-outline-warning">
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-slash-circle me-1"></i>
                    Block
                  </button>
                </div>
              </div>

              <div className="border-top border-secondary pt-3">
                <div className="mb-3">
                  <h6 className="text-white mb-2">Subscription Status</h6>
                  <span className={`badge ${getSubscriptionBadgeClass(currentUser.subscription?.status, currentUser.subscription?.planName)} fs-6`}>
                    {currentUser.subscription ? `${currentUser.subscription.planName} Plan` : 'No Subscription'}
                  </span>
                  {currentUser.subscription && (
                    <div className="mt-2 text-muted small">
                      <div>Status: {currentUser.subscription.status}</div>
                      <div>Start: {new Date(currentUser.subscription.startDate).toLocaleDateString()}</div>
                      <div>End: {new Date(currentUser.subscription.endDate).toLocaleDateString()}</div>
                      <div>Remaining: {currentUser.subscription.remainingDays} days</div>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <h6 className="text-white mb-2">Account Created</h6>
                  <p className="text-muted mb-0">{new Date(currentUser.registrationDate).toLocaleDateString()}</p>
                  <p className="text-muted mb-0">Active for {currentUser.daysActive} days</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-white mb-2">Engagement Score</h6>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 bg-dark" style={{ height: '8px' }}>
                      <div 
                        className={`progress-bar ${getEngagementBadgeClass(currentUser.engagementScore.category)}`} 
                        role="progressbar" 
                        style={{ width: `${currentUser.engagementScore.overall}%` }} 
                        aria-valuenow={currentUser.engagementScore.overall} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className={`badge ms-2 ${getEngagementBadgeClass(currentUser.engagementScore.category)}`}>
                      {currentUser.engagementScore.overall}%
                    </span>
                  </div>
                  <small className="text-muted">{currentUser.engagementScore.category} Engagement</small>
                </div>

                <div>
                  <h6 className="text-white mb-2">Coin Balance</h6>
                  <p className="text-warning mb-0">
                    <i className="bi bi-coin me-1"></i>
                    {currentUser.profile.coins}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {/* User Details Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="text-white mb-3">Personal Information</h5>
              
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="text-muted small">Full Name</label>
                  <p className="text-white mb-0">{currentUser.fullName}</p>
                </div>
                <div className="col-md-6">
                  <label className="text-muted small">Username</label>
                  <p className="text-white mb-0">{currentUser.username}</p>
                </div>
                <div className="col-md-6">
                  <label className="text-muted small">Email</label>
                  <p className="text-white mb-0">{currentUser.profile.email}</p>
                </div>
                <div className="col-md-6">
                  <label className="text-muted small">Age</label>
                  <p className="text-white mb-0">{currentUser.profile.age}</p>
                </div>
                <div className="col-md-6">
                  <label className="text-muted small">Gender</label>
                  <p className="text-white mb-0">{currentUser.profile.gender}</p>
                </div>
                <div className="col-md-6">
                  <label className="text-muted small">Location</label>
                  <p className="text-white mb-0">{currentUser.profile.location}</p>
                </div>
              </div>

              <h5 className="text-white mb-3">Activity Summary</h5>
              
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="card bg-dark bg-opacity-50">
                    <div className="card-body text-center">
                      <i className="bi bi-people text-primary fs-3 mb-2"></i>
                      <h2 className="text-white mb-0">{currentUser.matchStats.totalMatches}</h2>
                      <p className="text-muted mb-0">Total Matches</p>
                      <small className="text-muted">
                        {currentUser.matchStats.uniqueMatchedUsers} unique users
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-dark bg-opacity-50">
                    <div className="card-body text-center">
                      <i className="bi bi-chat-left-text text-success fs-3 mb-2"></i>
                      <h2 className="text-white mb-0">{currentUser.messageStats.totalSent}</h2>
                      <p className="text-muted mb-0">Messages Sent</p>
                      <small className="text-muted">
                        {currentUser.messageStats.responseRate}% response rate
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-dark bg-opacity-50">
                    <div className="card-body text-center">
                      <i className="bi bi-chat-right-text text-warning fs-3 mb-2"></i>
                      <h2 className="text-white mb-0">{currentUser.messageStats.totalReceived}</h2>
                      <p className="text-muted mb-0">Messages Received</p>
                      <small className="text-muted">
                        {currentUser.messageStats.uniqueConversations} conversations
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="text-white mb-3">Activity Details</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="card bg-dark bg-opacity-50">
                    <div className="card-body">
                      <h6 className="text-white">Message Statistics</h6>
                      <ul className="list-group list-group-flush bg-transparent">
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Total Messages</span>
                          <span>{currentUser.messageStats.total}</span>
                        </li>
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Average Per Day</span>
                          <span>{currentUser.messageStats.averagePerDay.toFixed(2)}</span>
                        </li>
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Unique Conversations</span>
                          <span>{currentUser.messageStats.uniqueConversations}</span>
                        </li>
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Response Rate</span>
                          <span>{currentUser.messageStats.responseRate}%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-dark bg-opacity-50">
                    <div className="card-body">
                      <h6 className="text-white">Match Statistics</h6>
                      <ul className="list-group list-group-flush bg-transparent">
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Total Matches</span>
                          <span>{currentUser.matchStats.totalMatches}</span>
                        </li>
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Unique Users</span>
                          <span>{currentUser.matchStats.uniqueMatchedUsers}</span>
                        </li>
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Average Per Day</span>
                          <span>{currentUser.matchStats.averagePerDay.toFixed(2)}</span>
                        </li>
                        <li className="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between">
                          <span>Latest Match</span>
                          <span>{new Date(currentUser.matchStats.latestMatchDate).toLocaleDateString()}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blocked Users Section */}
              {currentUser.blockedUsers && currentUser.blockedUsers.totalBlocked > 0 && (
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="text-white mb-3">Blocked Users ({currentUser.blockedUsers.totalBlocked})</h5>
                    <div className="table-responsive">
                      <table className="table table-dark">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date Blocked</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUser.blockedUsers.blockedUsersList.map(blocked => (
                            <tr key={blocked.userId}>
                              <td>{blocked.userId}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span>{blocked.fullName}</span>
                                  <span className="text-muted ms-1">@{blocked.username}</span>
                                </div>
                              </td>
                              <td>{new Date(blocked.blockDate).toLocaleDateString()}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="bi bi-unlock"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Location Information Card */}
              <div className="card">
                <div className="card-header bg-dark">
                  <h5 className="text-white mb-0">
                    <i className="bi bi-geo-alt me-2"></i>
                    Location Information
                  </h5>
                </div>
                <LocationInfo coordinates={currentUser.profile.location} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;