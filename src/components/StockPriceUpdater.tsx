import React, {useEffect, useRef, useState} from 'react';

const StockPriceUpdater: React.FC = () => {
    const [stockPrice, setStockPrice] = useState<string | null>(null);
    const [ticker, setTicker] = useState<string | null>(null);
    const [baseUrl, setBaseUrl] = useState<string>(``);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputBaseUrlRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (localStorage.getItem("baseUrl")) {
            setBaseUrl(localStorage.getItem("baseUrl") as string);
        } else {
            setBaseUrl('https://api.uat.finpal.com.vn/api/v1/real-time/stock/');
        }
    }, []);

    useEffect(() => {

        if (inputBaseUrlRef.current) {
            inputBaseUrlRef.current.value = baseUrl;
        }

        if (!ticker) return;

        const eventSource = new EventSource(`${baseUrl}${ticker}`);

        eventSource.onmessage = (event) => {
            console.log('Received message', event.data);
            setStockPrice(event.data);
        };

        return () => {
            eventSource.close();
        };
    }, [ticker, baseUrl]);

    const handleSubscribe = () => {
        if (inputRef.current && inputRef.current.value) {
            setTicker(inputRef.current.value);
        }
    };
    const handleChangeBaseUrl = () => {
        if (inputBaseUrlRef.current && inputBaseUrlRef.current.value) {
            localStorage.setItem('baseUrl', inputBaseUrlRef.current.value);
            setBaseUrl(inputBaseUrlRef.current.value);
        }
    };
    return (
        <div style={{width: '700px', wordWrap: 'break-word', alignSelf: 'left'}}>
            <br/>
            <span>baseUrl</span>
            <input style={{width:'400px'}} ref={inputBaseUrlRef}/>
            <button onClick={handleChangeBaseUrl}>changeBaseUrl</button>
            <br/>
            <br/>
            <span>Ticker: </span>
            <input ref={inputRef}/>
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
