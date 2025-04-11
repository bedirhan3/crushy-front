function Settings() {
    return (
        <div className="container-fluid">
            <h2 className="text-white mb-4">Settings</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <button className="list-group-item list-group-item-action active">General</button>
                        <button className="list-group-item list-group-item-action">Security</button>
                        <button className="list-group-item list-group-item-action">Notifications</button>
                        <button className="list-group-item list-group-item-action">API</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title">General Settings</h5>
                            {/* Settings form will go here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings; 