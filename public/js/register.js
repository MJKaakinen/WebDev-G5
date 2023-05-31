/**
 * TODO: 8.4 Register new user
 *       - Handle registration form submission
 *       - Prevent registration when password and passwordConfirmation do not match
 *       - Use createNotification() function from utils.js to show user messages of
 *       - error conditions and successful registration
 *       - Reset the form back to empty after successful registration
 *       - Use postOrPutJSON() function from utils.js to send your data back to server
 */

//compare method
const comparePasswords = (pswd1, pswd2) => {
    return (pswd1 === pswd2) ? true : false;
}

document.querySelector('#btnRegister').addEventListener('click', (e) => {
    e.preventDefault();

    const pswd = document.querySelector('#password')
    const pswdConfirmation = document.querySelector('#passwordConfirmation')
    if (!comparePasswords(pswd.value, pswdConfirmation.value)) {
        const container = pswdConfirmation.parentNode;
        // Going to be ugly as hell, but you can't change how createNotifications work
        container.id = "pswd-confirmation-container";
        createNotification('Passwords do not match', container.id, false);
    }
    else {
        const form = document.querySelector('#register-form');
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        })
        postOrPutJSON('/api/register','POST', data);
    }

});
