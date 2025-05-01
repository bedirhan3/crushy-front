import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../store/slices/generalSlice';
import { toast } from 'react-toastify';

function EditUser() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isLoadingUser } = useSelector((state) => state.general);

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        age: '',
        gender: '',
        location: '',
        role: '',
        coins: 0,
    });

    const [subscriptionData, setSubscriptionData] = useState({
        hasSubscription: false,
        planName: 'Basic',
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        remainingDays: 30,
        action: 'none'
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                fullName: currentUser.fullName || '',
                username: currentUser.username || '',
                email: currentUser.profile.email || '',
                age: currentUser.profile.age || '',
                gender: currentUser.profile.gender || '',
                location: currentUser.profile.location || '',
                role: currentUser.role || '',
                coins: currentUser.profile.coins || 0,
            });

            // Set subscription data if user has one
            if (currentUser.subscription) {
                setSubscriptionData({
                    hasSubscription: true,
                    planName: currentUser.subscription.planName || 'Basic',
                    status: currentUser.subscription.status || 'active',
                    startDate: new Date(currentUser.subscription.startDate).toISOString().split('T')[0],
                    endDate: new Date(currentUser.subscription.endDate).toISOString().split('T')[0],
                    remainingDays: currentUser.subscription.remainingDays || 0,
                    action: 'keep'
                });
            } else {
                setSubscriptionData({
                    hasSubscription: false,
                    planName: 'Basic',
                    status: 'active',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    remainingDays: 30,
                    action: 'none'
                });
            }
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubscriptionChange = (e) => {
        const { name, value } = e.target;

        if (name === 'endDate') {
            const startDate = new Date(subscriptionData.startDate);
            const endDate = new Date(value);
            const diffTime = endDate - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            setSubscriptionData({
                ...subscriptionData,
                [name]: value,
                remainingDays: diffDays > 0 ? diffDays : 0
            });
        } else if (name === 'startDate') {
            const startDate = new Date(value);
            const endDate = new Date(subscriptionData.endDate);
            const diffTime = endDate - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            setSubscriptionData({
                ...subscriptionData,
                [name]: value,
                remainingDays: diffDays > 0 ? diffDays : 0
            });
        } else {
            setSubscriptionData({ ...subscriptionData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            fullName: formData.fullName,
            username: formData.username,
            role: formData.role,
            profile: {
                email: formData.email,
                age: parseInt(formData.age),
                gender: formData.gender,
                location: formData.location,
                coins: parseInt(formData.coins),
                imageUrl: currentUser.profile.imageUrl,
            }
        };

        // Add subscription data if needed
        if (subscriptionData.action === 'add' || subscriptionData.action === 'update') {
            userData.subscription = {
                planName: subscriptionData.planName,
                status: subscriptionData.status,
                startDate: new Date(subscriptionData.startDate).toISOString(),
                endDate: new Date(subscriptionData.endDate).toISOString(),
                remainingDays: subscriptionData.remainingDays
            };
        } else if (subscriptionData.action === 'remove') {
            userData.subscription = null;
        } else if (subscriptionData.action === 'keep' && currentUser.subscription) {
            userData.subscription = {
                ...currentUser.subscription,
                planName: subscriptionData.planName,
                status: subscriptionData.status,
                startDate: new Date(subscriptionData.startDate).toISOString(),
                endDate: new Date(subscriptionData.endDate).toISOString(),
                remainingDays: subscriptionData.remainingDays
            };
        }

        dispatch(updateUser({ userId: id, userData }))
            .unwrap()
            .then(() => {
                toast.success('User updated successfully');
                navigate(`/users/${id}`);
            })
            .catch((error) => {
                toast.error('Failed to update user: ' + error);
            });
    };

    // Function to handle subscription action selection
    const handleSubscriptionAction = (action) => {
        if (action === 'add') {
            setSubscriptionData({
                ...subscriptionData,
                hasSubscription: true,
                action: 'add',
                status: 'active',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                remainingDays: 30
            });
        } else if (action === 'remove') {
            setSubscriptionData({
                ...subscriptionData,
                action: 'remove'
            });
        } else if (action === 'update') {
            setSubscriptionData({
                ...subscriptionData,
                action: 'update'
            });
        } else {
            setSubscriptionData({
                ...subscriptionData,
                action: 'keep'
            });
        }
    };

    // Get badge class for subscription display
    const getSubscriptionBadgeClass = (status, planName) => {
        if (status !== 'active') return 'bg-danger';

        switch (planName) {
            case 'Premium': return 'bg-warning';
            case 'EVO': return 'bg-success';
            case 'Basic': return 'bg-info';
            default: return 'bg-primary';
        }
    };

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
                        <Link to="/admin/users" className="btn btn-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Users
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-white mb-0">Edit User</h4>
                <Link to={`/admin/users/${id}`} className="btn btn-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to User Profile
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label text-white">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label text-white">Username</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-white"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label text-white">Age</label>
                                    <input
                                        type="number"
                                        className="form-control bg-dark text-white"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label text-white">Gender</label>
                                    <select
                                        className="form-select bg-dark text-white"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label text-white">Location</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label text-white">Role</label>
                                    <select
                                        className="form-select bg-dark text-white"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="User">User</option>
                                        <option value="VerifiedUser">Verified User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="coins" className="form-label text-white">Coins</label>
                                    <input
                                        type="number"
                                        className="form-control bg-dark text-white"
                                        id="coins"
                                        name="coins"
                                        value={formData.coins}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Subscription Management Section */}
                        <div className="mt-4 mb-4">
                            <h5 className="text-white mb-3">Subscription Management</h5>

                            {currentUser.subscription ? (
                                <div className="mb-3">
                                    <div className="alert bg-dark text-white">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="text-white mb-0">Current Subscription:</h6>
                                            <span className={`badge ${getSubscriptionBadgeClass(currentUser.subscription.status, currentUser.subscription.planName)}`}>
                                                {currentUser.subscription.planName} Plan
                                            </span>
                                        </div>
                                        <div className="mb-2">Status: <span className={currentUser.subscription.status === 'active' ? 'text-success' : 'text-danger'}>{currentUser.subscription.status}</span></div>
                                        <div className="mb-2">Start Date: {new Date(currentUser.subscription.startDate).toLocaleDateString()}</div>
                                        <div className="mb-2">End Date: {new Date(currentUser.subscription.endDate).toLocaleDateString()}</div>
                                        <div>Remaining: {currentUser.subscription.remainingDays} days</div>
                                    </div>

                                    <div className="mt-3 mb-3">
                                        <label className="form-label text-white">What would you like to do?</label>
                                        <div className="d-flex gap-2 flex-wrap">
                                            <button type="button"
                                                className={`btn ${subscriptionData.action === 'keep' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => handleSubscriptionAction('keep')}>
                                                Keep Current
                                            </button>
                                            <button type="button"
                                                className={`btn ${subscriptionData.action === 'update' ? 'btn-warning' : 'btn-outline-warning'}`}
                                                onClick={() => handleSubscriptionAction('update')}>
                                                Modify
                                            </button>
                                            <button type="button"
                                                className={`btn ${subscriptionData.action === 'remove' ? 'btn-danger' : 'btn-outline-danger'}`}
                                                onClick={() => handleSubscriptionAction('remove')}>
                                                Cancel Subscription
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="alert bg-dark mb-3">
                                    <p className="mb-2">User has no active subscription.</p>
                                    <button
                                        type="button"
                                        className={`btn ${subscriptionData.action === 'add' ? 'btn-success' : 'btn-outline-success'}`}
                                        onClick={() => handleSubscriptionAction('add')}>
                                        Add Subscription
                                    </button>
                                </div>
                            )}

                            {/* Subscription edit form - shown when adding or updating */}
                            {(subscriptionData.action === 'add' || subscriptionData.action === 'update') && (
                                <div className="card bg-dark border-secondary mt-3">
                                    <div className="card-body">
                                        <h6 className="text-white mb-3">
                                            {subscriptionData.action === 'add' ? 'New Subscription' : 'Update Subscription'}
                                        </h6>

                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="planName" className="form-label text-white">Plan</label>
                                                    <select
                                                        className="form-select bg-dark text-white"
                                                        id="planName"
                                                        name="planName"
                                                        value={subscriptionData.planName}
                                                        onChange={handleSubscriptionChange}
                                                        required={subscriptionData.action === 'add' || subscriptionData.action === 'update'}
                                                    >
                                                        <option value="Basic">Basic</option>
                                                        <option value="Premium">Premium</option>
                                                        <option value="EVO">EVO</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="status" className="form-label text-white">Status</label>
                                                    <select
                                                        className="form-select bg-dark text-white"
                                                        id="status"
                                                        name="status"
                                                        value={subscriptionData.status}
                                                        onChange={handleSubscriptionChange}
                                                        required={subscriptionData.action === 'add' || subscriptionData.action === 'update'}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="expired">Expired</option>
                                                        <option value="suspended">Suspended</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="startDate" className="form-label text-white">Start Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control bg-dark text-white"
                                                        id="startDate"
                                                        name="startDate"
                                                        value={subscriptionData.startDate}
                                                        onChange={handleSubscriptionChange}
                                                        required={subscriptionData.action === 'add' || subscriptionData.action === 'update'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="endDate" className="form-label text-white">End Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control bg-dark text-white"
                                                        id="endDate"
                                                        name="endDate"
                                                        value={subscriptionData.endDate}
                                                        onChange={handleSubscriptionChange}
                                                        required={subscriptionData.action === 'add' || subscriptionData.action === 'update'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-info">
                                                    <div className="d-flex align-items-center">
                                                        <i className="bi bi-info-circle me-2"></i>
                                                        <span>Subscription duration: <strong>{subscriptionData.remainingDays} days</strong></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(`/users/${id}`)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-save me-2"></i>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser; 