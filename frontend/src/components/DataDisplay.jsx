import React from 'react';
import '../DataDisplay.css';

const DataDisplay = ({ date, powerConsumption, voltage, current }) => {
    return (
        <div className="data-container">
            <h2 className="data-header">Power Consumption Analysis</h2>

            <div className="data-grid">
                <div className="data-card">
                    <div className="data-item">
                        <span className="data-label">📅 Timestamp:</span>
                        <span className="data-value">
                            {date ? new Date(date).toLocaleString() : 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="data-card">
                    <div className="data-item">
                        <span className="data-label">⚡ Power Consumption:</span>
                        <span 
                            className={`data-value ${powerConsumption > 100 ? 'high-consumption' : 'normal-consumption'}`}
                        >
                            {typeof powerConsumption === 'number' ? powerConsumption.toFixed(2) : 'N/A'} kWh
                        </span>
                    </div>
                </div>

                <div className="data-card">
                    <div className="data-item">
                        <span className="data-label">🔋 Voltage:</span>
                        <span className="data-value">
                            {typeof voltage === 'number' ? `${voltage} V` : 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="data-card">
                    <div className="data-item">
                        <span className="data-label">🔌 Current:</span>
                        <span className="data-value">
                            {typeof current === 'number' ? `${current} A` : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataDisplay;
