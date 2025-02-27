import React, { useState, useEffect } from "react";
import axios from "axios";
import DataDisplay from "./DataDisplay";

const DataFetcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://ed01-41-139-168-163.ngrok-free.app/logs/1",{
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                      }
                });
                console.log("API Response:", response.data);

                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    throw new Error("Unexpected API response format");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <DataDisplay 
                        key={index} 
                        date={item.timestamp} 
                        powerConsumption={item.consumption_value} 
                    />
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default DataFetcher;
