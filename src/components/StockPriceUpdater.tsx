import React, { useState, useEffect } from 'react';

const StockPriceUpdater: React.FC = () => {
    const [stockPrice, setStockPrice] = useState<number | null>(null);

    useEffect(() => {
        const eventSource = new EventSource('https://api.uat.finpal.com.vn/api/v1/real-time/stock/VIH');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setStockPrice(data.stockPrice);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
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