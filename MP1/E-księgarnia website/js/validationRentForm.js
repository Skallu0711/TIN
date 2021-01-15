function validateForm()
{
    // input constants
    const customerInput = document.getElementById('customer');
    const bookInput = document.getElementById('book');
    const deliveryAddressInput = document.getElementById('delivery_address');
    const rentDateInput = document.getElementById('rent_date');
    const returnDateInput = document.getElementById('return_date');
    
    // error constants
    const errorCustomer = document.getElementById('errorCustomer');
    const errorBook = document.getElementById('errorBook');
    const errorDeliveryAddress = document.getElementById('errorDeliveryAddress');
    const errorRentDate = document.getElementById('errorRentDate');
    const errorReturnDate = document.getElementById('errorReturnDate');
    
    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')
    
    // reset errors
    resetErrors([customerInput, bookInput, deliveryAddressInput, rentDateInput, returnDateInput],[errorCustomer, errorBook, errorDeliveryAddress, errorRentDate, errorReturnDate], errorsSummary);
    
    let valid = true;
    
    // current date
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    
    if (month.length < 2)
        month = '0' + month;
    
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');
    
    // validate customer
    if (!checkRequired(customerInput.value) || customerInput.value == "---Wybierz klienta---")
    {
        valid = false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText = "Pole jest wymagane";
    }
    
    // validate book
    if (!checkRequired(bookInput.value) || bookInput.value == "---Wybierz ksiazke---")
    {
        valid = false;
        bookInput.classList.add("error-input");
        errorBook.innerText = "Pole jest wymagane";
    }
    
    // validate delivery address
    if (deliveryAddressInput.value != "" && !checkTextLengthRange(deliveryAddressInput.value, 5, 60))
    {
        valid = false;
        deliveryAddressInput.classList.add("error-input");
        errorDeliveryAddress.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    }
    
    // validate rent date
    if (!checkRequired(rentDateInput.value))
    {
        valid = false;
        rentDateInput.classList.add("error-input");
        errorRentDate.innerText = "Pole jest wymagane";
    }
    else if (!checkDate(rentDateInput.value))
    {
        valid = false;
        rentDateInput.classList.add("error-input");
        errorRentDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    }
    else if (checkDateIfAfter(rentDateInput.value, nowString))
    {
        valid = false;
        rentDateInput.classList.add("error-input");
        errorRentDate.innerText = "Data nie może być z przyszłości";
    }
    
    // validate return date
    if (returnDateInput.vaule != null && !checkDate(returnDateInput.value))
    {
        valid = false;
        returnDateInput.classList.add("error-input");
        errorReturnDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    }
     //jeśli data wypozyczenia oraz data oddania jest poprawna, sprawdzamy kolejność dat
    else if (checkRequired(returnDateInput.value) && checkDate(returnDateInput.value)
        && !checkDateIfAfter(returnDateInput.value, rentDateInput.value))
    {
        valid = false;
        returnDateInput.classList.add("error-input");
        errorReturnDate.innerText = "Data zwrotu powinna być późniejsza niż data wypozyczenia";
    }
    
    // validate summary
    if (!valid)
        errorsSummary.innerText = "Formularz zawiera błędy";
    
    return valid;
}

function resetErrors(inputs, errorTexts, errorInfo)
{
    for(let i=0; i<inputs.length; i++)
        inputs[i].classList.remove("error_input");
    
    for(let i=0; i<errorTexts.length; i++)
        errorTexts[i].innerText = "";
    
    errorInfo.innerText = "";
}

function checkRequired(value)
{
    if (!value)
        return false;
    
    value = value.toString().trim();
    
    if (value === "")
        return false;
    
    return true;
}

function checkTextLengthRange(value, min, max)
{
    if (!value)
        return false;
    
    value = value.toString().trim();
    const length = value.length;
    
    if (max && length > max)
        return false;
    
    if (min && length < min)
        return false;
    
    return true;
}

function checkDate(value)
{
    if (!value)
        return false;
    
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    
    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo)
{
    if (!value)
        return false;
    
    if (!compareTo)
        return false;
    
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    
    if (!pattern.test(value))
        return false;
    
    if (!pattern.test(compareTo))
        return false;
    
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    
    if (valueDate.getTime() <= compareToDate.getTime())
        return false;
    
    return true;
}