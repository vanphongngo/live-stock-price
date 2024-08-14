import React, { useState, useEffect } from 'react';

const StockPriceUpdater: React.FC = () => {
    const [stockPrice, setStockPrice] = useState<string | null>(null);

    useEffect(() => {
        const eventSource = new EventSource('https://api.uat.finpal.com.vn/api/v1/real-time/stock/VIH');

        eventSource.onmessage = (event) => {
            setStockPrice(event.data);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div style={{width: '500px', wordWrap: 'break-word' }}>
            <h2>Stock Price Updater</h2>
            {stockPrice !== null ? (
                <p>Stock Price: {stockPrice}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StockPriceUpdater;