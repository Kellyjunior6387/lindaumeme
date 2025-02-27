import React, { useState } from 'react';
import '../DataDisplay.css'; // Import the CSS file

const DataDisplay = ({ date, powerConsumption }) => {
    const [threshold, setThreshold] = useState('');

    const handleInputChange = (event) => {
        setThreshold(event.target.value);
    };

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-item">
                    <label className="card-label">Threshold:</label>
                    <input
                        type="text"
                        className="card-input"
                        value={threshold}
                        onChange={handleInputChange}
                        placeholder="Enter threshold"
                    />
                </div>
            </div>
            <div className="card">
                <div className="card-item">
                    <span className="card-label">Timestamp:</span>
                    <span className="card-value">{date}</span>
                </div>
            </div>
            <div className="card">
                <div className="card-item">
                    <span className="card-label">Power Consumption:</span>
                    <span className="card-value">{powerConsumption} kWh</span>
                </div>
            </div>
        </div>
    );
}

export default DataDisplay;
