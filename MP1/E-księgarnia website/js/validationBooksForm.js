function validateForm()
{
    // input constants
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const publishingCompanyInput = document.getElementById('publishing_company');
    const numberOfCopiesInput = document.getElementById('number_of_copies');
    const languageInput = document.getElementById('language');
    
    // error constants
    const errorTitle = document.getElementById('errorTitle');
    const errorAuthor = document.getElementById('errorAuthor');
    const errorPublishingCompany = document.getElementById('errorPublishingCompany');
    const errorNumberOfCopies = document.getElementById('errorNumberOfCopies');
    const errorLanguage = document.getElementById('errorLanguage');
    
    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')
    
    // reset errors
    resetErrors([titleInput, authorInput, publishingCompanyInput, numberOfCopiesInput, languageInput], [errorTitle, errorAuthor, errorPublishingCompany, errorNumberOfCopies, errorLanguage], errorsSummary);
    
    let valid = true;
    
    // validate title
    if (!checkRequired(titleInput.value))
    {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(titleInput.value, 3, 60))
    {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }
    
    // validate author
    if (!checkRequired(authorInput.value))
    {
        valid = false;
        authorInput.classList.add("error-input");
        errorAuthor.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(authorInput.value, 3, 60))
    {
        valid = false;
        authorInput.classList.add("error-input");
        errorAuthor.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }
    
    // validate publishing company
    if (publishingCompanyInput.value != "" && !checkTextLengthRange(publishingCompanyInput.value, 3, 60))
    {
        valid = false;
        publishingCompanyInput.classList.add("error-input");
        errorPublishingCompany.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }
    
    // validate number of copies
    if (numberOfCopiesInput.value != "")
    {
        if ( (numberOfCopiesInput.value > 100) || (numberOfCopiesInput.value < 1) )
        {
            valid = false;
            numberOfCopiesInput.classList.add("error=input");
            errorNumberOfCopies.innerText = "Liczba powinna być z zakresu od 1 do 100";
        }
    }
    
    // validate language
    if (languageInput.value != "" && !checkTextLengthRange(languageInput.value, 3, 60))
    {
        valid = false;
        languageInput.classList.add("error-input");
        errorLanguage.innerText = "Pole powinno zawierać od 3 do 60 znaków";
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