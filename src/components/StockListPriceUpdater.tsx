import React, {useEffect, useRef, useState} from 'react';
import ReactJson from 'react-json-view';

const StockPriceUpdater: React.FC = () => {
        const [stockPrice, setStockPrice] = useState<Object>();
        const [ticker, setTicker] = useState<string | null>(null);
        const [baseUrl, setBaseUrl] = useState<string>(`http://localhost:8081`);
        const inputRef = useRef<HTMLInputElement>(null);

        const [option, setOption] = useState('http://localhost:8081');

        const KEY_TICKER_LOCAL_STORAGE = "tickerList";


        useEffect(() => {
            if (localStorage.getItem(KEY_TICKER_LOCAL_STORAGE) && inputRef.current) {
                inputRef.current.value = localStorage.getItem(KEY_TICKER_LOCAL_STORAGE) as string;
            }
        }, []);

        useEffect(() => {

            if (!ticker) return;

            const eventSource = new EventSource(`${baseUrl}/api/v1/real-time/stock/list/${ticker}`);

            eventSource.onmessage = (event) => {
                console.log('Received message', JSON.parse(event.data));
                setStockPrice(JSON.parse(event.data));
            };

            return () => {
                eventSource.close();
            };
        }, [ticker,baseUrl]);

        const handleSubscribe = () => {
            if (inputRef.current && inputRef.current.value) {
                setTicker(inputRef.current.value);
                localStorage.setItem(KEY_TICKER_LOCAL_STORAGE, inputRef.current.value);
                setBaseUrl(option);
            }
        };

        const handleOptionChange = (e: any) => {
            console.log(e.target.value);
            const selectedOption = e.target.value;
            setOption(selectedOption);
        }


        return (
            <div style={{width: '700px', wordWrap: 'break-word', alignSelf: 'left'}}>
                <h2>Stock Price Updater List</h2>
                <div>
                    <select value={option} onChange={handleOptionChange}>
                        <option value="http://localhost:8081">LOCAL</option>
                        <option value="https://api.uat.finpal.com.vn">UAT</option>
                        <option value="https://api.staging.finpal.com.vn">STAGING</option>
                        <option value="https://api.finpal.com.vn">PROD</option>
                    </select>
                    <div>
                        <p>Base URL: {option}</p>
                    </div>
                </div>
                <span>Ticker: </span>
                <input ref={inputRef}/>
                <button onClick={handleSubscribe}>Subscribe</button>

                <div>
                    {stockPrice && <ReactJson src={stockPrice} theme="monokai" collapsed={false}/>}
                </div>

            </div>
        );
    }
;

export default StockPriceUpdater;
