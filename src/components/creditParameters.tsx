import { useEffect, useState } from 'react';
import '../App.css';
import getRefinancingRate from './refinancingRate';
import updateMainResult from './getMainResult';

// Function of component with credit parameters that are entered by the user.
function CreditParameters() {
    // Initializing the default value for the loan.
    const [creditAmount, setСreditAmount] = useState("10000");
    const [refinancingRate, setRefinancingRate] = useState(0);
    // Initialization of the variable "loading" to load the value of the NBRB refinancing rate for the current day.
    const [loading, setLoading] = useState(true);
    // Checking for the loading of the refinancing rate: if the result is positive, the value is passed to the variable "refinancingRate" and the loading is turned off.
    useEffect(() => {
        getRefinancingRate().then((rate) => {
            setRefinancingRate(rate);
            setLoading(false);
        });
    }, []);
    // If the download is disabled, the data is updated in the form of the main payment calculation.
    useEffect(() => {
        if (!loading) {
            updateMainResult(document);
        }
    }, [refinancingRate, creditAmount, loading]);
    // If the loading is enabled, an element notifying about the download is displayed on the page instead of the form with the credit data entry.
    if (loading) {
        return <span>Loading...</span>;
    };
    return (
        <form id="creditParameters">
            <h1>Параметры кредита</h1>
            <p>Сумма:&nbsp;
                <input type="number" id="creditAmount" value={creditAmount}
                    onChange={event => setСreditAmount(event.target.value)}></input> руб.
            </p>
            <p>Срок:&nbsp;
                <select id="creditTerm" >
                    <option value="1">1 месяц</option>
                    <option value="3">3 месяца</option>
                    <option value="6">6 месяцев</option>
                    <option value="12" selected>1 год</option>
                    <option value="24">2 года</option>
                    <option value="60">5 лет</option>
                </select>
            </p>
            <p>Процентная ставка:&nbsp;
                <input type="number" id="refinancingRate"
                    value={refinancingRate}
                    onChange={event => setRefinancingRate(+event.target.value)}
                ></input> %
            </p>
            <p>Вид платежа:&nbsp;
                <select id="paymentType">
                    <option id="annuity" selected>Аннуитетный</option>
                    <option id="differentiated">Дифференцированный</option>
                </select>
            </p>
        </form>
    );
}

export default CreditParameters;