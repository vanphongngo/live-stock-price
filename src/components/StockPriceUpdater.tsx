import React, { useState, useEffect, useRef } from 'react';

const StockPriceUpdater: React.FC = () => {
    const [stockPrice, setStockPrice] = useState<string | null>(null);
    const [ticker, setTicker] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!ticker) return;

        const eventSource = new EventSource(`https://api.uat.finpal.com.vn/api/v1/real-time/stock/${ticker}`);

        eventSource.onmessage = (event) => {
            setStockPrice(event.data);
        };

        return () => {
            eventSource.close();
        };
    }, [ticker]);

    const handleSubscribe = () => {
        if (inputRef.current && inputRef.current.value) {
            setTicker(inputRef.current.value);
        }
    };

    return (
        <div style={{ width: '500px', wordWrap: 'break-word' }}>
            <span>Ticker: </span>
            <input ref={inputRef} />
            <button onClick={handleSubscribe}>Subscribe</button>
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
