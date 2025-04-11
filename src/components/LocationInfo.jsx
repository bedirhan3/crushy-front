import { useEffect, useState } from "react";

function LocationInfo({ coordinates }) {
  const [locationInfo, setLocationInfo] = useState({
    loading: true,
    country: null,
    city: null,
    address: null,
    error: null
  });

  useEffect(() => {
    if (!coordinates) return;

    const [latitude, longitude] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    
    const fetchLocationDetails = async () => {
      try {
        setLocationInfo(prev => ({ ...prev, loading: true }));
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        
        setLocationInfo({
          loading: false,
          country: data.address.country || 'Unknown',
          city: data.address.city || data.address.town || data.address.village || 'Unknown',
          address: data.display_name || 'Unknown address',
          error: null
        });
      } catch (error) {
        console.error("Location fetch error:", error);
        setLocationInfo({
          loading: false,
          country: null,
          city: null,
          address: null,
          error: "Could not retrieve location information"
        });
      }
    };

    fetchLocationDetails();
  }, [coordinates]);

  if (locationInfo.loading) {
    return (
      <div className="card-body text-center">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2 mb-0">Fetching location information...</p>
      </div>
    );
  }

  if (locationInfo.error) {
    return (
      <div className="card-body">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {locationInfo.error}
        </div>
      </div>
    );
  }

  return (
    <div className="card-body">
      <h6 className="text-white mb-3">Location Details</h6>
      <div className="d-flex align-items-center mb-3">
        <div className="bg-primary bg-opacity-25 rounded p-2 me-3">
          <i className="bi bi-geo-alt text-primary fs-4"></i>
        </div>
        <div>
          <p className="text-white mb-0">{locationInfo.city}, {locationInfo.country}</p>
          <small className="text-muted">{coordinates}</small>
        </div>
      </div>
      <div className="mb-3">
        <label className="text-muted small">Full Address</label>
        <p className="text-white mb-0">{locationInfo.address}</p>
      </div>
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=${coordinates}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-sm btn-outline-primary w-100"
      >
        <i className="bi bi-map me-2"></i>
        View on Google Maps
      </a>
    </div>
  );
}

export default LocationInfo;