const feedbackForm = document.querySelector('.form-js');
let formData = {
    email: '',
    message: '',
};

const fillFormFields = () => {
    try {
        const formDataFromLs = JSON.parse(localStorage.getItem('feedback-form-state'));
        
        if (formDataFromLs === null) {
            return;
        }
        formData = formDataFromLs;
        for (const key in formDataFromLs) {
            feedbackForm.elements[key].value = formDataFromLs[key];
        }
    } catch (error) {
        console.log(error);
    }
};

fillFormFields();

const onFormFieldInput = event => {
    const { target: formFieldEl } = event;
    const fieldValue = formFieldEl.value.trim();
    const fieldName = formFieldEl.name;
    formData[fieldName] = fieldValue;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    console.log(formData);
};
const onFeedbackFormSubmit = event => {
    event.preventDefault();
    if (Object.values(formData).some(value => value.trim() === '')) {
        alert('Fill please all fields');
        return;
    }
    console.log('Form Data:', formData);
    
    event.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
};

feedbackForm.addEventListener('input', onFormFieldInput);
feedbackForm.addEventListener('submit', onFeedbackFormSubmit);