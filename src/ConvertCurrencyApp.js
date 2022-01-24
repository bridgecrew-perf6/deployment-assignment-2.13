import APICurrencyList from "./APICurrencyList";
import APIConversion from "./APIConversion";
import { useState } from 'react';
import './ConvertCurrencyApp.css'
import _ from "lodash";

function ConvertCurrencyApp(){

    const [currencyList, setCurrencyList] = useState([]);
    const [fromValue, setFromValue] = useState(0);
    const [fromCurr, setFromCurr] = useState("SGD");
    const [toCurr, setToCurr] = useState("SGD");
    const [finalValue, setFinalValue] = useState(0);
 
    (async () => {
        const { data } = await APICurrencyList.get('/listquotes');
        console.log("Data in async ", data);
        console.log("Currency List in async", currencyList);

        if( !(_.isEqual(currencyList,data))){
            setCurrencyList(data);            
        }
    })();

    function handleOnChange(event){
        switch(event.target.name){
            case "from_amount":
                setFromValue(event.target.value);
                break;
            case "fromCurrencies":
                setFromCurr(event.target.value);
                break;
            case "toCurrencies":
                setToCurr(event.target.value);
                break;
            default:
                break;
        }
    }

    async function handleOnSubmit(event){
        event.preventDefault();
        let params = {from: fromCurr, to: toCurr};
        console.log("parameters", params);
        const { status, data } = await APIConversion.get('/exchange', {params: params});
        if ( status === 200){
            setFinalValue(data*fromValue);
        }        
    }   
    
    return (
        <>
        <h1>What's the latest exchange rates? Convert Here.</h1>
        <div>
            <form onSubmit={handleOnSubmit} className="formContainer">
                <div className="fromContainer">
                    <h2>From:</h2>
                    <input
                        type="number"
                        placeholder="amount"
                        name="from_amount"
                        onChange={handleOnChange}
                        className="inputText"
                    />
                    <select id="currencies" name="fromCurrencies" onChange={handleOnChange} className="dropdown">
                        {currencyList.map((element) => {
                            return <option value={element}>{element}</option>;
                        })}
                    </select>
                </div>

                <div className="toContainer">
                    <h2>To:</h2>
                    <div className="displayText">{finalValue}</div> 
                    <select id="currencies" name="toCurrencies" onChange={handleOnChange} className="dropdown">
                        {currencyList.map((element) => {
                            return <option value={element}>{element}</option>;
                        })}
                    </select>
                </div>

                <button className="btn">Convert!</button>                
            </form>
        </div>
        </>
    )

}

export default ConvertCurrencyApp;