import React, { useState } from 'react';
import ThresholdInput from './ThresholdInput';
import '../DataDisplay.css';

const DataDisplay = ({ date, powerConsumption }) => {
    const [threshold, setThreshold] = useState('');

    return (
        <div className="card-container">
            
            <div className="card">
                <div className="card-item">
                    <span className="card-label">Timestamp:</span>
                    <span className="card-value">{date ? new Date(date).toLocaleString() : 'N/A'}</span>
                </div>
            </div>
            <div className="card">
                <div className="card-item">
                    <span className="card-label">Power Consumption:</span>
                    <span className="card-value">
                        {typeof powerConsumption === 'number' ? powerConsumption.toFixed(2) : 'N/A'} kWh
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DataDisplay;
