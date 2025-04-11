function SubscriptionsWidget() {
    const subscriptions = [
        {
            id: 1,
            name: "Samantha",
            age: 24,
            type: "Premium Subscription",
            validUntil: "24 July 2022",
            status: "1 year"
        },
        {
            id: 2,
            name: "Samantha",
            age: 24,
            type: "Lorem ipsum has been the ind...",
            validUntil: "24 July 2022"
        },
        {
            id: 3,
            name: "Samantha",
            age: 24,
            type: "Lorem ipsum has been the ind...",
            validUntil: "24 July 2022"
        }
    ];

    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title text-white mb-0">Subscriptions</h5>
                    <button className="btn btn-sm btn-dark">
                        Add <i className="bi bi-plus-circle ms-1"></i>
                    </button>
                </div>
                <div className="subscriptions">
                    {subscriptions.map(sub => (
                        <div key={sub.id} className="subscription-item p-3 mb-2 rounded"
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
                                            {sub.name} <span className="text-muted">{sub.age}</span>
                                        </h6>
                                        <small className="text-muted">Valid till: {sub.validUntil}</small>
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

export default SubscriptionsWidget; 