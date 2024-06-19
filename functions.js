document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        
        // Get the values from the form
        const numOfPeriods = document.getElementById('NumOfPeriods').value;
        const interestPerYear = document.getElementById('InterestPerYear').value;
        const presentValue = Number(document.getElementById('PresentValueInput').value);
        const periodicPayment = document.getElementById('PeriodicPayment').value;
        // Perform calculations 
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
    
        createPieChart(presentValue, sumOfPayments, totalInterest);
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



function createPieChart(startingAmount, periodicDeposits, interest) {
    const data = {
        labels: ['Starting amount', 'Periodic deposits', 'Interest'],
        datasets: [{
            data: [startingAmount.toFixed(2), periodicDeposits.toFixed(2), interest.toFixed(2)],
            backgroundColor: [
                // Starting amount color
                'rgba(255, 99, 132, 0.6)', 
                // Periodic deposits color
                'rgba(54, 162, 235, 0.6)', 
                // Interest color
                'rgba(75, 192, 192, 0.6)', 
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    };

    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
 
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        const label = data.labels[tooltipItem.index];
                        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': $' + value.toFixed(2);
                    }
                }
            }
        }
    });
}
