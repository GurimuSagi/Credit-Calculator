import { useEffect, useState } from 'react';
import '../App.css';
import getRefinancingRate from './refinancingRate';

// The function of calculating the loan by annuity payment.
function calculationAnnuityPayment(credit: number, monthsTerm: number, bet: number, monthlyPayment: number) {
    // Getting today's date.
    let dateTime = new Date()
    let day = dateTime.getDate();
    let month = dateTime.getMonth() + 1;
    let year = dateTime.getFullYear();
    // Initialization of the table with payments and the remains.
    const table: any[] = [];
    let remains = credit;
    for (let i = 0; i < monthsTerm; i++) {
        // Calculation of interest payments, main debt payments and the balance of the loan body.
        let interestPayment = Number((remains * bet).toFixed(2));
        let mainDebtPayment = Number((monthlyPayment - Number(interestPayment)).toFixed(2));
        remains = Number((remains - Number(mainDebtPayment)).toFixed(2));
        let totalPaymentAmount = (interestPayment + mainDebtPayment).toFixed(2);
        // Checking the final balance of payments. If the value is below zero, then the variable is assigned 0.
        if (Number(remains) < 0) remains = 0;
        // Creating a row of table with data on monthly annuity payments.
        const row = (
            <tr>
                <td>{i + 1}</td>
                <td>{day}.{month}.{year}</td>
                <td>{interestPayment}</td>
                <td>{mainDebtPayment}</td>
                <td>{totalPaymentAmount}</td>
                <td>{remains}</td>
            </tr>
        );
        // Checking the correctness of the data and increasing it.
        month += 1;
        if (month > 12) {
            month = 1;
            year = year + 1;
        }
        // Adding a new row to the table.
        table.push(row);
    }
    return table;
}
// The function of calculating the loan by differentiated payment.
function calculationDifferentiatedPayment(credit: number, months: number, bet: number) {
    // Getting today's date.
    let dateTime = new Date()
    let day = dateTime.getDate();
    let month = dateTime.getMonth() + 1;
    let year = dateTime.getFullYear();
    // Initialization of the table with payments, the total amount of the payment and the remains.
    const table: any[] = [];
    let totalPaymentAmount = (credit / months).toFixed(2);
    let remains = credit;
    for (let i = 0; i < months; i++) {
        // Calculation of interest payments, main debt payments and the balance of the loan body.
        let interestPayment = Number((remains) * bet / months).toFixed(2);
        let mainDebtPayment = Number((Number(totalPaymentAmount) + Number(interestPayment)).toFixed(2));
        remains = Number(remains - Number(totalPaymentAmount));
        // Checking the final balance of payments. If the value is below zero, then the variable is assigned 0.
        if (Number(remains) < 0) remains = 0;
        // Creating a row of table with the monthly differentiated payment data.
        const row = (
            <tr>
                <td>{i + 1}</td>
                <td>{day}.{month}.{year}</td>
                <td>{interestPayment}</td>
                <td>{mainDebtPayment}</td>
                <td>{totalPaymentAmount}</td>
                <td>{remains.toFixed(2)}</td>
            </tr>
        );
        // Checking the correctness of the data and increasing it.
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
        // Adding a new row to the table.
        table.push(row);
    }
    return table;
}
// Function of component with a table of detailed calculations for differentiated and annuity payments.
function RefinancingDetails() {
    // Initialization of the default refinancing rate value for the loan.
    const [refinancingRate, setRefinancingRate] = useState(22);
    // Checking for the loading of the refinancing rate: if the result is positive, the value is passed to the variable "refinancingRate".
    useEffect(() => {
        getRefinancingRate().then((rate) => {
            setRefinancingRate(rate);
        });
    }, []);
    // Initializing default credit values.
    let creditAmountValue = 10000;
    let creditTermValue = 12;
    let refinancingRateValue = refinancingRate / 12 / 100;
    let monthlyPaymentValue = Number((creditAmountValue * (refinancingRateValue + (refinancingRateValue / ((Math.pow(1 + refinancingRateValue, creditTermValue) - 1))))).toFixed(2));
    // Calculation of annuity and differentiated payment tables.
    let annuityTable = calculationAnnuityPayment(creditAmountValue, creditTermValue, refinancingRateValue, monthlyPaymentValue);
    let differentiatedTable = calculationDifferentiatedPayment(creditAmountValue, creditTermValue, refinancingRateValue);
    return (
        <form id="refinancingDetails">
            <h1>Детали расчёта</h1>
            <h2>Аннуитетный</h2>
            <table id="annuityPaymentsList">
                <tr>
                    <th>№ платежа</th>
                    <th>Дата платежа</th>
                    <th>Платёж по процентам, руб.</th>
                    <th>Платёж по основному долгу, руб.</th>
                    <th>Общая сумма платежа, руб.</th>
                    <th>Остаток по телу кредита, руб.</th>
                </tr>
                {
                    // Inserting the received rows of the annuity payment table into the rendering of the table element.
                    annuityTable
                }
            </table>
            <h2>Дифференцированный платёж</h2>
            <table id="differentiatedPaymentsList">
                <tr>
                    <th>№ платежа</th>
                    <th>Дата платежа</th>
                    <th>Платёж по процентам, руб.</th>
                    <th>Платёж по основному долгу, руб.</th>
                    <th>Общая сумма платежа, руб.</th>
                    <th>Остаток по телу кредита, руб.</th>
                </tr>
                {
                    // Inserting the received rows of the differentiated payment table into the rendering of the table element.
                    differentiatedTable
                }
            </table>
            <script>
            </script>
        </form>
    );
}

export default RefinancingDetails;