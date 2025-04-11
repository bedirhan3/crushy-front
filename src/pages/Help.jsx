function Help() {
    return (
        <div className="container-fluid">
            <h2 className="text-white mb-4">Help Center</h2>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title">Documentation</h5>
                            <p className="card-text">Access comprehensive guides and documentation.</p>
                            <button className="btn btn-outline-light">View Docs</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title">Support</h5>
                            <p className="card-text">Get help from our support team.</p>
                            <button className="btn btn-outline-light">Contact Support</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help; 