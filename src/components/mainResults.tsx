import React from 'react';
import '../App.css';

// The function of component with basic calculations for differentiated and annuity payments.
function MainResults() {
    let currency = "руб.";
    return (
        <form id="mainResults">
            <h1>Результат</h1>
            <p>Сумма кредита: <span id="SUM">0</span> {currency}</p>
            <p id="monthlyPayment">Ежемесячный платёж: <span id="monthlyPaymentValue">0</span> {currency}</p>
            <p id="maxMonthlyPayment">Максимальный ежемесячный платёж: <span id="maxMonthlyPaymentValue">0</span> {currency}</p>
            <p id="minMonthlyPayment">Минимальный ежемесячный платёж: <span id="minMonthlyPaymentValue">0</span> {currency}</p>
            <p>Общая сумма выплат по кредиту: <span id="paymentsAmount">0</span> {currency}</p>
            <p>Общая сумма переплаты по кредиту: <span id="overpaymentsAmount">0</span> {currency}</p>
            <button id="buttonOfRefinancindDetails"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    // By pressing the "Детали расчёта" button, the form with the calculation details becomes visible through making changes to the style - {display: inline}, and the "Детали расчёта" button becomes hidden through {display: none}.
                    event.preventDefault();
                    let element = document.getElementById('refinancingDetails') as HTMLElement;
                    element.style.display = "inline";
                    let button = document.getElementById('buttonOfRefinancindDetails') as HTMLElement;
                    button.style.display = "none";
                }}>Детали расчёта</button>
        </form>
    );
}

export default MainResults;