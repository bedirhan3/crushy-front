function ChatRequestWidget() {
    const chatRequests = [
        {
            id: 1,
            name: "Samantha",
            age: 24,
            message: "Lorem ipsum has been the ind...",
            time: "3 mins ago"
        },
        {
            id: 2,
            name: "Samantha",
            age: 24,
            message: "Lorem ipsum has been the ind...",
            time: "3 mins ago"
        },
        {
            id: 3,
            name: "Samantha",
            age: 24,
            message: "Lorem ipsum has been the ind...",
            time: "3 mins ago"
        }
    ];

    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title text-white mb-0">Chat Request</h5>
                </div>
                <div className="chat-requests">
                    {chatRequests.map(request => (
                        <div key={request.id} className="chat-request-item p-3 mb-2 rounded"
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
                                            {request.name} <span className="text-muted">{request.age}</span>
                                        </h6>
                                        <small className="text-muted">{request.message}</small>
                                    </div>
                                </div>
                                <small className="text-muted">{request.time}</small>
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

export default ChatRequestWidget; 