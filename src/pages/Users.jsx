import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, toggleSelectUser, selectAllUsers, resetSelectedUsers, setFilteredUsers } from '../store/slices/generalSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Users() {
    const dispatch = useDispatch();
    const { users, filteredUsers, selectedUsers, isLoading } = useSelector((state) => state.general);
    const [activeTab, setActiveTab] = useState('All User');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAllSelected, setIsAllSelected] = useState(false);

    // Component mount olduğunda kullanıcıları getir
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Tab değişimini işle
    useEffect(() => {
        if (activeTab === 'All User') {
            dispatch(setFilteredUsers(users));
        } else if (activeTab === 'Subscribers') {
            const subscribedUsers = users.filter(user => user.subscriptions && user.subscriptions.length > 0);
            dispatch(setFilteredUsers(subscribedUsers));
        } else if (activeTab === 'Reported Users') {
            // API'de reported users olmadığı için boş bir array döndürüyoruz
            dispatch(setFilteredUsers([]));
        }
        dispatch(resetSelectedUsers());
        setIsAllSelected(false);
    }, [activeTab, users, dispatch]);

    // Arama işlemini yönet
    useEffect(() => {
        if (searchTerm.trim() === '') {
            // Aktif taba göre filtreleme yap
            if (activeTab === 'All User') {
                dispatch(setFilteredUsers(users));
            } else if (activeTab === 'Subscribers') {
                const subscribedUsers = users.filter(user => user.subscriptions && user.subscriptions.length > 0);
                dispatch(setFilteredUsers(subscribedUsers));
            } else if (activeTab === 'Reported Users') {
                dispatch(setFilteredUsers([]));
            }
        } else {
            // Arama terimine göre filtreleme yap
            const filteredResults = users.filter(user =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.profile.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.profile.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            dispatch(setFilteredUsers(filteredResults));
        }
    }, [searchTerm, users, activeTab, dispatch]);

    // Tüm kullanıcıları seç/kaldır
    const handleSelectAll = () => {
        const newState = !isAllSelected;
        setIsAllSelected(newState);
        dispatch(selectAllUsers(newState));
    };

    // Seçili kullanıcıları sil
    const handleDeleteSelected = () => {
        if (selectedUsers.length === 0) {
            toast.error('Lütfen silmek için kullanıcı seçin');
            return;
        }

        if (window.confirm(`${selectedUsers.length} kullanıcıyı silmek istediğinizden emin misiniz?`)) {
            selectedUsers.forEach(userId => {
                dispatch(deleteUser(userId));
            });
        }
    };

    // Abonelik adını formatla
    const formatSubscriptionName = (user) => {
        if (!user.subscriptions || user.subscriptions.length === 0) {
            return { name: 'NORMAL', className: 'bg-secondary' };
        }

        // Aktif aboneliği bul
        const activeSubscription = user.subscriptions.find(sub => sub.status === 'active');
        if (!activeSubscription) {
            return { name: 'Expired', className: 'bg-danger' };
        }

        const planName = activeSubscription.plan.name;

        if (planName === 'Premium') {
            return { name: 'PREMIUM', className: 'bg-warning' };
        } else if (planName === 'EVO') {
            return { name: 'EVO', className: 'bg-success' };
        } else if (planName === 'Basic') {
            return { name: 'BASIC', className: 'bg-info' };
        }

        return { name: planName, className: 'bg-primary' };
    };

    // Top rated kullanıcıları (abonelikleri aktif olan) 
    const topRatedUsers = users
        .filter(user => user.subscriptions && user.subscriptions.some(sub => sub.status === 'active'))
        .slice(0, 8);

    return (
        <div className="container-fluid p-0">
            {/* Top Rated Users Section */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="text-white mb-0">Top Rated Users</h5>
                        <button
                            className="btn btn-link text-muted text-decoration-none"
                            onClick={() => setActiveTab('Subscribers')}
                        >
                            Show all subscribers
                        </button>
                    </div>
                    <div className="position-relative">
                        <button className="btn btn-dark position-absolute start-0 top-50 translate-middle-y rounded-circle z-1">
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <div className="row g-3 overflow-hidden">
                            {topRatedUsers.map(user => (
                                <div key={user.id} className="col">
                                    <div className="position-relative" style={{ aspectRatio: '1/1' }}>
                                        <div className="rounded" style={{
                                            backgroundImage: `url(${user.profile.imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: '100%',
                                            height: '100%',
                                        }}>
                                            {!user.profile.imageUrl && (
                                                <div style={{
                                                    backgroundColor: '#916d3e',
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <i className="bi bi-image text-white fs-1"></i>
                                                </div>
                                            )}
                                        </div>
                                        {user.role === 'VerifiedUser' && (
                                            <div className="position-absolute top-0 end-0 m-2">
                                                <i className="bi bi-patch-check-fill text-primary"></i>
                                            </div>
                                        )}
                                        <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white"
                                            style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                                            <div className="small">{user.profile.fullname} · {user.profile.age}</div>
                                            <div className="small text-muted">{formatSubscriptionName(user).name}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-dark position-absolute end-0 top-50 translate-middle-y rounded-circle">
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table Section */}
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="text-white mb-0">Users ({users.length})</h5>
                        <div className="d-flex gap-2">
                            <div className="input-group" style={{ width: "260px" }}>
                                <input
                                    type="text"
                                    className="form-control bg-dark border-dark text-white"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-dark">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                            <button className="btn btn-danger" onClick={handleDeleteSelected}>
                                <i className="bi bi-trash me-2"></i>
                                Delete
                            </button>
                            <button className="btn btn-primary">
                                <i className="bi bi-plus-lg me-2"></i>
                                Create Users
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="btn-group">
                            {['All User', 'Subscribers', 'Reported Users'].map(tab => (
                                <button
                                    key={tab}
                                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-dark'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center my-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-dark table-hover">
                                <thead>
                                    <tr className="text-primary">
                                        <th>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Role</th>
                                        <th>Coin</th>
                                        <th>Subscriber</th>
                                        <th>Created At</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => {
                                        const subscription = formatSubscriptionName(user);
                                        return (
                                            <tr key={user.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => dispatch(toggleSelectUser(user.id))}
                                                    />
                                                </td>
                                                <td>{user.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-2" style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            backgroundImage: `url(${user.profile.imageUrl})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            borderRadius: '4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            {!user.profile.imageUrl && <i className="bi bi-image text-white"></i>}
                                                        </div>
                                                        <span>{user.profile.fullname}</span>
                                                        {user.role === 'VerifiedUser' && <i className="bi bi-patch-check-fill text-primary ms-2"></i>}
                                                    </div>
                                                </td>
                                                <td>{user.profile.age}</td>
                                                <td>{user.profile.email}</td>
                                                <td>{user.profile.gender ? 'Male' : 'Female'}</td>
                                                <td>
                                                    <span className={`badge ${user.role === 'Admin' ? 'bg-danger' :
                                                        user.role === 'VerifiedUser' ? 'bg-success' : 'bg-secondary'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td>{user.profile.coin}</td>
                                                <td>
                                                    <span className={`badge ${subscription.className}`}>
                                                        {subscription.name}
                                                    </span>
                                                </td>
                                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn btn-link text-muted" data-bs-toggle="dropdown">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-dark">
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item"
                                                                    to={`/user-view/${user.id}`}
                                                                >
                                                                    View Profile
                                                                </Link>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#edit">Edit User</a></li>
                                                            <li><a className="dropdown-item" href="#block">Block User</a></li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item text-danger"
                                                                    href="#delete"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        if (window.confirm(`${user.profile.fullname} kullanıcısını silmek istediğinizden emin misiniz?`)) {
                                                                            dispatch(deleteUser(user.id));
                                                                        }
                                                                    }}
                                                                >
                                                                    Delete
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="11" className="text-center py-4">
                                                {activeTab === 'Reported Users'
                                                    ? 'Henüz raporlanan kullanıcı bulunmamaktadır.'
                                                    : 'Kullanıcı bulunamadı.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users;