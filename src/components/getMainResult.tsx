function updateMainResults(doc: Document) {
    // Initialization of the elements on the page that we will change the style for.
    let paymentType = doc.getElementById('paymentType') as HTMLSelectElement;
    let monthlyPayment = doc.getElementById('monthlyPayment') as HTMLElement;
    let maxMonthlyPayment = doc.getElementById('maxMonthlyPayment') as HTMLElement;
    let minMonthlyPayment = doc.getElementById('minMonthlyPayment') as HTMLElement;
    
    // Checking for a change in the type of payment: if the result is positive, we change the visibility of some fields in the form with the main result of the calculation.
    paymentType.onchange = (event: any) => {
        // If the "Аннуитетный" payment type is selected, we are reducing the visibility of the "Максимальный ежемесячный платёж" and "Минимальный ежемесячный платёж" fields, and the "Ежемесячный платёж" becomes more visible.
        if (paymentType.options[paymentType.selectedIndex].text === "Аннуитетный") {
            monthlyPayment.style.opacity = "1";
            maxMonthlyPayment.style.opacity = "0.5";
            minMonthlyPayment.style.opacity = "0.5";
        }
        // If the "Дифференцированный" payment type is selected, we are reducing the visibility of the "Ежемесячный платёж" field, and the "Максимальный ежемесячный платёж" and "Минимальный ежемесячный платёж" become more visible.
        else if (paymentType.options[paymentType.selectedIndex].text === "Дифференцированный") {
            monthlyPayment.style.opacity = "0.5";
            maxMonthlyPayment.style.opacity = "1";
            minMonthlyPayment.style.opacity = "1";
        }
    }

    // Initialization of the elements from the page from which the values for calculating the main payment data will be taken.
    let creditAmount = doc.getElementById('creditAmount') as HTMLInputElement;
    let creditTerm = doc.getElementById('creditTerm') as HTMLSelectElement;
    let refinancingRate = doc.getElementById('refinancingRate') as HTMLInputElement;
    let table = document.getElementById('differentiatedPaymentsList') as HTMLTableElement;

    // The function of obtaining basic loan calculations. 
    function getMainResult() {
        // Initialization of the loan data entered by the user.
        let creditAmountValue = Number(creditAmount.value);
        let creditTermValue = Number(creditTerm.options[creditTerm.selectedIndex].value);
        let refinancingRateValue = Number(refinancingRate.value);
        // Initialization of the elements on the page in which the obtained calculation results will be entered.
        let SUM = doc.getElementById('SUM') as HTMLSpanElement;
        let monthlyPayment = doc.getElementById('monthlyPaymentValue') as HTMLSpanElement;
        let maxMonthlyPayment = doc.getElementById('maxMonthlyPaymentValue') as HTMLSpanElement;
        let minMonthlyPayment = doc.getElementById('minMonthlyPaymentValue') as HTMLSpanElement;
        let paymentsAmount = doc.getElementById("paymentsAmount") as HTMLSpanElement;
        let overpaymentsAmount = doc.getElementById("overpaymentsAmount") as HTMLSpanElement;
        refinancingRateValue = refinancingRateValue / 100 / 12;
        // Calculation of the main data on the loan and their output to the initialized elements.
        SUM.innerHTML = "" + creditAmountValue;
        monthlyPayment.innerHTML = "" + (creditAmountValue * (refinancingRateValue + (refinancingRateValue / ((Math.pow(1 + refinancingRateValue, creditTermValue) - 1))))).toFixed(2);
        maxMonthlyPayment.innerText = "" + table.rows[1].cells[3].textContent;
        minMonthlyPayment.innerText = "" + table.rows[Number(table.rows.length)-1].cells[3].textContent;
        paymentsAmount.innerText = "" + (Number(monthlyPayment.innerText) * creditTermValue).toFixed(2);
        overpaymentsAmount.innerText = "" + (Number(paymentsAmount.innerText) - creditAmountValue).toFixed(2);
    }

    // Launching the calculation function from the main data on the loan.
    getMainResult();
    // Checking for data changes: if the result is positive, we re-launch the function for calculating the main data on the loan.
    let creditParameters = doc.getElementById("creditParameters") as HTMLFormElement;
    creditParameters.onchange = (event: any) => getMainResult();
}
export default updateMainResults;