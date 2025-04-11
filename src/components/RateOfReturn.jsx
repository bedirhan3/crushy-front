import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RateOfReturn() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [70.34, 10.34, 19.32],
                    backgroundColor: [
                        '#4B7BE5',  // Subscribers - Blue
                        '#FFA800',  // Advertisement - Orange
                        '#50CD89'   // Events - Green
                    ],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 className="card-title text-white mb-1">Rate of Return</h5>
                        <small className="text-muted d-flex align-items-center">
                            RATE OF RETURN
                            <i className="bi bi-info-circle ms-2"></i>
                        </small>
                    </div>
                    <button className="btn btn-sm text-muted">
                        Show Details
                    </button>
                </div>

                <div className="position-relative" style={{ height: '200px' }}>
                    <canvas ref={chartRef}></canvas>
                    <div className="position-absolute top-50 start-50 translate-middle text-center">
                        <h3 className="text-white mb-0">70.34%</h3>
                        <small className="text-muted">Percentage of<br />Subscribers</small>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-circle-fill text-primary me-2"></i>
                            <span className="text-white">Return of Subscribers</span>
                        </div>
                        <span className="text-white">70.34%</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-circle-fill text-warning me-2"></i>
                            <span className="text-white">Return of Advertisement</span>
                        </div>
                        <span className="text-white">10.34%</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-circle-fill text-success me-2"></i>
                            <span className="text-white">Return of Events</span>
                        </div>
                        <span className="text-white">20.34%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RateOfReturn; 