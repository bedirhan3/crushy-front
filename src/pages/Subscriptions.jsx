function Subscriptions() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white mb-0">Subscriptions</h2>
                <button className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>New Subscription Plan
                </button>
            </div>
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <h5 className="card-title">Active Subscriptions</h5>
                    {/* Subscription plans and stats will go here */}
                </div>
            </div>
        </div>
    );
}

export default Subscriptions; 