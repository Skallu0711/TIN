function validateFormCustomers()
{
    // input constants
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const addressInput = document.getElementById('address');
    const zipCodeInput = document.getElementById('zip_code');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phone_number');
    
    // error constants
    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');
    const errorAddress = document.getElementById('errorAddress');
    const errorZipCode = document.getElementById('errorZipCode');
    const errorEmail = document.getElementById('errorEmail');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    
    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')
    
    // reset errors
    resetErrors([nameInput, surnameInput, addressInput, zipCodeInput, emailInput, phoneNumberInput],[errorName, errorSurname, errorAddress, errorZipCode, errorEmail, errorPhoneNumber], errorsSummary);
    
    let valid = true;
    
    // validate name
    if (!checkRequired(nameInput.value))
    {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(nameInput.value, 2, 60))
    {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    // validate surname
    if (!checkRequired(surnameInput.value))
    {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(surnameInput.value, 2, 60))
    {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    // validate address
    if (!checkRequired(addressInput.value))
    {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(addressInput.value, 2, 60))
    {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    
    // validate zipCode
    if (zipCodeInput.value != "" && !checkZipCode(zipCodeInput.value))
    {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = "Pole powinno zawierać prawidłowy adres email zgodny ze wzorcem";
    }
    
    // validate email
    if (emailInput.value != "" && !checkEmail(emailInput.value))
    {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email zgodny ze wzorcem";
    }
    
    // validate phoneNumber
    if (!checkRequired(phoneNumberInput.value))
    {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole jest wymagane";
    }
    else if (!checkPhoneNumber(phoneNumberInput.value))
    {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno zawierać prawidlowy numer telefonu zgodny ze wzorcem";
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
    
    if (value == "")
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

function checkZipCode(value)
{
    if (!value)
        return false;    
    
    value = value.toString().trim();
    const re = /[0-9]{2}\-[0-9]{3}/i;
    
    return re.test(value);
    
}

function checkEmail(value)
{
    if (!value)
        return false;
    
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    return re.test(value);
}

function checkPhoneNumber(value)
{
    if (!value)
        return false;
    
    value = value.toString().trim();
    const re = /[0-9]{3}\-[0-9]{3}\-[0-9]{3}/i;
    
    return re.test(value);
}

