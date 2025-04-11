import RateOfReturn from '../components/RateOfReturn';
import ChatRequestWidget from '../components/ChatRequestWidget';
import SubscriptionsWidget from '../components/SubscriptionsWidget';
import UserReportsWidget from '../components/UserReportsWidget';

function Dashboard() {
    return (
        <div className="container-fluid p-0">
            <div className="row g-4">
                <div className="col-md-6">
                    <RateOfReturn />
                </div>
                <div className="col-md-6">
                    <div className="row g-4">
                        <div className="col-12">
                            {/* Buraya başka widget'lar eklenebilir */}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <ChatRequestWidget />
                </div>
                <div className="col-md-4">
                    <SubscriptionsWidget />
                </div>
                <div className="col-md-4">
                    <UserReportsWidget />
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 