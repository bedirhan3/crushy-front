import { useState } from 'react';

function UserReports() {
    const [activeTab, setActiveTab] = useState('Blocked User');
    const [searchTerm, setSearchTerm] = useState('');

    const reports = [
        {
            id: 1,
            user: {
                name: "Emma Smith",
                email: "emma@gmail.com",
                avatar: null
            },
            reportType: "Fake Profile",
            date: "2024-01-15",
            status: "Pending",
            description: "User reported for creating multiple fake profiles",
            priority: "High"
        },
        {
            id: 2,
            user: {
                name: "John Doe",
                email: "john@example.com",
                avatar: null
            },
            reportType: "Harassment",
            date: "2024-01-14",
            status: "Resolved",
            description: "Inappropriate messages and harassment reported",
            priority: "Medium"
        },
        {
            id: 3,
            user: {
                name: "Sarah Wilson",
                email: "sarah@example.com",
                avatar: null
            },
            reportType: "Spam",
            date: "2024-01-13",
            status: "In Progress",
            description: "Multiple spam messages sent to users",
            priority: "Low"
        },
        {
            id: 4,
            user: {
                name: "Michael Brown",
                email: "michael@example.com",
                avatar: null
            },
            reportType: "Inappropriate Content",
            date: "2024-01-12",
            status: "Pending",
            description: "Posted inappropriate content in profile",
            priority: "High"
        }
    ];

    const stats = [
        { title: "Total Reports", value: "2,324", change: "+12.4%", trend: "up" },
        { title: "Pending Reports", value: "432", change: "-4.2%", trend: "down" },
        { title: "Resolved Reports", value: "1,892", change: "+8.3%", trend: "up" },
        { title: "Average Response", value: "2.4h", change: "-1.2h", trend: "up" }
    ];

    return (
        <div className="container-fluid p-0">
            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-md-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h6 className="text-muted mb-1">{stat.title}</h6>
                                        <h3 className="text-white mb-0">{stat.value}</h3>
                                    </div>
                                    <span className={`badge ${stat.trend === 'up' ? 'bg-success' : 'bg-danger'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="progress" style={{ height: '4px' }}>
                                    <div
                                        className={`progress-bar ${stat.trend === 'up' ? 'bg-success' : 'bg-danger'}`}
                                        style={{ width: '70%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="btn-group">
                            {['Blocked User', 'User Feedback', 'Bug Reports'].map(tab => (
                                <button
                                    key={tab}
                                    className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-dark'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="d-flex gap-2">
                            <div className="input-group" style={{width:"60%"}}>
                                <input
                                    type="text"
                                    className="form-control bg-dark border-dark text-white"
                                    placeholder="Search reports..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-dark">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                            <button className="btn btn-primary">
                                <i className="bi bi-plus-lg me-2"></i>
                                Add Report
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-check-input" />
                                    </th>
                                    <th>User</th>
                                    <th>Report Type</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(report => (
                                    <tr key={report.id}>
                                        <td>
                                            <input type="checkbox" className="form-check-input" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="me-2" style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    backgroundColor: '#916d3e',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <i className="bi bi-person text-white"></i>
                                                </div>
                                                <div>
                                                    <div className="text-white">{report.user.name}</div>
                                                    <small className="text-muted">{report.user.email}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{report.reportType}</td>
                                        <td>{report.date}</td>
                                        <td>
                                            <span className={`badge ${report.status === 'Pending' ? 'bg-warning' :
                                                report.status === 'Resolved' ? 'bg-success' :
                                                    'bg-primary'
                                                }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-muted">{report.description}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${report.priority === 'High' ? 'bg-danger' :
                                                report.priority === 'Medium' ? 'bg-warning' :
                                                    'bg-success'
                                                }`}>
                                                {report.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn btn-sm btn-dark">
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button className="btn btn-sm btn-dark">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-dark">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReports; 