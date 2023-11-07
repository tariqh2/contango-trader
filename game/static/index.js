// Javascript functions for when all page content loads:

document.addEventListener('DOMContentLoaded', function () {

    // Setting up the trigger for the modal on the index.html file
    var tradingModal = new bootstrap.Modal(document.getElementById('tradingModal'), {
      keyboard: false
    });
    
    var tradingForm = document.getElementById('tradingForm');
    var messageContainer = document.getElementById('messageContainer'); // Ensure this element exists to display messages

    // Add an event listener for the form submission
    tradingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Collect form data into FormData object
        var formData = new FormData(tradingForm);

        // Perform the POST request using fetch API
        fetch(tradingForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest' // Necessary for Django to recognize AJAX request
            },
            credentials: 'same-origin' // Includes CSRF token in the request
        })
        .then(response => {
            // Check if the response is not ok and the status is 400
            if (!response.ok && response.status === 400) {
                // If status is 400, parse and return the JSON response to the next .then()
                return response.json();
            } else if (response.ok) {
                // If response is ok, check if there's a redirect, handle it, or pass the JSON on
                return response.json().then(data => {
                    if (data.redirect) {
                        // Redirect if a URL is provided
                        window.location.href = data.redirect;
                        return;
                    }
                    return data; // You might not need this line if you're sure the successful response always redirects
                });
            } else {
                // If the response is not ok and not 400, throw an error to catch
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            // Handle the message from a 400 status response
            if (data && data.message) {
                messageContainer.textContent = data.message;
                messageContainer.style.display = 'block';
            }
        })
        .catch(error => {
            // Handle any errors that occur during fetch
            messageContainer.textContent = 'An error occurred: ' + error.toString();
            messageContainer.style.display = 'block';
        });
    });
});
