import React, { useState } from 'react';
import '../ThresholdInput.css';

const ThresholdInput = () => {
    const [threshold, setThreshold] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setThreshold(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!threshold.trim()) return; // Prevent empty submissions

        setMessage(`✅ Successfully set your threshold to: ${threshold}`); // Display success message
        setThreshold(''); // Clear input after submission

        // Hide message after 3 seconds
        setTimeout(() => setMessage(''), 10000);
    };

    return (
        <div className="card threshold-container">
            <form onSubmit={handleSubmit} className="threshold-form">
                <label className="threshold-label">Threshold:</label>
                <input
                    type="text"
                    className="threshold-input"
                    value={threshold}
                    onChange={handleInputChange}
                    placeholder="Enter threshold"
                />
                <button 
                    type="submit" 
                    className="threshold-button"
                    disabled={!threshold.trim()} // Disable if empty
                >
                    Submit
                </button>
            </form>
            {message && <p className="threshold-message">{message}</p>}
        </div>
    );
};

export default ThresholdInput;
