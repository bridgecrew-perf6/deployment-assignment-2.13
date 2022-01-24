import axios from 'axios';

const CurrencyList = axios.create({
    baseURL:"https://currency-exchange.p.rapidapi.com/",
    headers: {
        'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        'x-rapidapi-key': '55f4e64419mshcaba04fee6bbc64p1379c9jsncb154fa2e3bb'
    }
});

export default CurrencyList;
