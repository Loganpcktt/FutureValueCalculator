document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        
        // Get the values from the form
        const numOfPeriods = document.getElementById('NumOfPeriods').value;
        const interestPerYear = document.getElementById('InterestPerYear').value;
        const presentValue = document.getElementById('PresentValueInput').value;
        const periodicPayment = document.getElementById('PeriodicPayment').value;
        
        // Perform calculations (these are placeholder calculations, replace with actual logic)
        const futureValue = calculateFutureValue(presentValue, interestPerYear, numOfPeriods, periodicPayment);
        const presentValueResult = calculatePresentValue(futureValue, interestPerYear, numOfPeriods);
        const sumOfPayments = calculateSumOfPayments(numOfPeriods, periodicPayment);
        const totalInterest = calculateTotalInterest(futureValue, sumOfPayments, presentValue);
        
        console.log(presentValueResult)
        // Display the results
        document.getElementById('FutureValue').textContent = futureValue.toFixed(2);
        document.getElementById('PresentValue').textContent = presentValueResult.toFixed(2);
        document.getElementById('SumOfPayments').textContent = sumOfPayments.toFixed(2);
        document.getElementById('TotalInterest').textContent = totalInterest.toFixed(2);
    });
});

function calculateFutureValue(presentValue, interestPerYear, numOfPeriods, periodicPayment) {
    const i = Number(interestPerYear) / 100;
    const n = Number(numOfPeriods);
    const pmt = Number(periodicPayment);
    
    // Calculate future value of the present value
    const futureValuePV = presentValue * Math.pow((1 + i), n);

    // Calculate future value of the periodic deposits
    const futureValuePMT = pmt * (Math.pow((1 + i), n) - 1) / i;

    // Calculate Total future value and return
    return futureValuePV + futureValuePMT;}

function calculatePresentValue(futureValue, interestRate, numOfPeriods) {
    // Convert interest rate to decimal
    const i = interestRate / 100; 

    return futureValue / Math.pow((1 + i), numOfPeriods);
}

function calculateSumOfPayments(numOfPeriods, periodicPayment) {
    // Calculate Total Periodic Deposits and return
    return Number(periodicPayment) * Number(numOfPeriods);
}

function calculateTotalInterest(futureValue, sumOfPayments, presentValue) {
    // Calculate Total Interest and return
    return Number(futureValue) - Number(sumOfPayments) - Number(presentValue);
}
