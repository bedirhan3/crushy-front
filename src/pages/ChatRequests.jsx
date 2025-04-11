function ChatRequests() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white mb-0">Chat Requests</h2>
                <div className="btn-group">
                    <button className="btn btn-outline-light">
                        <i className="bi bi-filter me-2"></i>Filter
                    </button>
                    <button className="btn btn-outline-light">
                        <i className="bi bi-sort-down me-2"></i>Sort
                    </button>
                </div>
            </div>
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <h5 className="card-title">Recent Chat Requests</h5>
                    {/* Chat requests list will go here */}
                </div>
            </div>
        </div>
    );
}

export default ChatRequests; 