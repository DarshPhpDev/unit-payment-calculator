

let totalPrice = document.getElementById('totalPrice');
let downPayment = document.getElementById('downPayment');
let yearsOfInstallments = document.getElementById('yearsOfInstallments');
let maximumMonthlyInstallment = document.getElementById('maximumMonthlyInstallment');
let yearsOfRemainingPayment = document.getElementById('yearsOfRemainingPayment');
let calculateBtn = document.getElementById('calculateBtn');


let unitMeterPrice = document.getElementById('unitMeterPrice');
let MonthlyInstallmentVal = document.getElementById('MonthlyInstallmentVal');
let QuarterInstallmentVal = document.getElementById('QuarterInstallmentVal');
let RemainingPaymentVal = document.getElementById('RemainingPaymentVal');
let RemainingPaymentPerYearVal = document.getElementById('RemainingPaymentPerYearVal');


// Function to format the number with commas
function formatNumberWithCommas(value) {
    // Remove any non-numeric characters except the decimal point
    value = value.toString().replace(/[^0-9.]/g, '');

    // Split the value into integer and decimal parts
    let parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function removeCommas(value) {
    return value.replace(/,/g, '');
}


function calculate(){
    if(totalPrice.value != "" && downPayment.value != "" && yearsOfInstallments.value != ""){
        if(unitArea.value != ""){
            unitMeterPrice.innerHTML = formatNumberWithCommas(parseInt(parseInt(removeCommas(totalPrice.value)) / parseInt(unitArea.value))) + ' EGP';
        }else{
            unitMeterPrice.innerHTML = "";
        }

        let afterDownPayment =  removeCommas(totalPrice.value) 
                                    - 
                                removeCommas(downPayment.value);
        let noOfMonths = parseInt(removeCommas(yearsOfInstallments.value) * 12);

        let MonthlyInstallment = 0;
        if(maximumMonthlyInstallment.value != ""){
            MonthlyInstallment = parseInt(removeCommas(maximumMonthlyInstallment.value));
            let remainingPayment = parseInt(afterDownPayment - (MonthlyInstallment * noOfMonths));
            RemainingPaymentVal.innerHTML = formatNumberWithCommas(remainingPayment) + ' EGP';
            if(yearsOfRemainingPayment.value != ""){
                RemainingPaymentPerYearVal.innerHTML = formatNumberWithCommas(parseInt(remainingPayment / parseInt(yearsOfRemainingPayment.value))) + ' EGP';
            }else{
                RemainingPaymentPerYearVal.innerHTML = "";
            }
        }else{
            MonthlyInstallment = parseInt(afterDownPayment / noOfMonths);
            RemainingPaymentVal.innerHTML = "";
            RemainingPaymentPerYearVal.innerHTML = "";
        }
        MonthlyInstallmentVal.innerHTML = formatNumberWithCommas(MonthlyInstallment) + ' EGP';
        QuarterInstallmentVal.innerHTML = formatNumberWithCommas(parseInt(MonthlyInstallment * 3)) + ' EGP';
    }
}




document.querySelectorAll('input').forEach(function(input) {
    // Add event listener to prevent typing non-numeric characters
    input.addEventListener('keypress', function (e) {
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    });
    
    input.addEventListener('input', function (e) {
        this.value = formatNumberWithCommas(this.value);
    });

    input.addEventListener('keyup', function (e) {
        calculate();
    });
});

