function UserReportsWidget() {
    const reports = [
        {
            id: 1,
            name: "Samantha",
            age: 24,
            type: "Reported Virtual Members",
            date: "24 July 2022"
        },
        {
            id: 2,
            name: "Samantha",
            age: 24,
            type: "Reported Fake button bug",
            date: "24 July 2022"
        },
        {
            id: 3,
            name: "Samantha",
            age: 24,
            type: "Lorem ipsum has been the ind...",
            date: "24 July 2022"
        }
    ];

    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title text-white mb-0">User Report</h5>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-dark active">Blocked User</button>
                        <button className="btn btn-sm btn-dark">User Feedback</button>
                    </div>
                </div>
                <div className="reports">
                    {reports.map(report => (
                        <div key={report.id} className="report-item p-3 mb-2 rounded"
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="avatar me-3" style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="bi bi-person text-white"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 text-white">
                                            {report.name} <span className="text-muted">{report.age}</span>
                                        </h6>
                                        <small className="text-muted">{report.type}</small>
                                    </div>
                                </div>
                                <button className="btn btn-sm btn-outline-light">Manage</button>
                            </div>
                        </div>
                    ))}
                    <div className="text-center mt-3">
                        <button className="btn btn-link text-muted text-decoration-none">
                            SCROLL DOWN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReportsWidget; 