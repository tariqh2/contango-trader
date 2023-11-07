// Popover Set up 1: Set up help guide that is dismissed on next click

var helpLink = document.getElementById('helpLink');
var popover = new bootstrap.Popover(helpLink, {
  trigger: 'focus', // Only trigger on click
  title: 'Help',    // You can also set the title here if you prefer
  content: // Set the content here
            'Bid = Price You Are Willing To Pay \
            Offer = Price You Are Willing To Sell ' 
});


// Modal Set up 1: Setting up the trigger for the modal on the index.html file

document.addEventListener('DOMContentLoaded', function () {
    var tradingModal = new bootstrap.Modal(document.getElementById('tradingModal'), {
      keyboard: false
    });
    
    var tradingForm = document.getElementById('tradingForm');
    
    // Event listener for when the modal is shown
    document.getElementById('tradingModal').addEventListener('show.bs.modal', function (event) {
      console.log('Modal is shown');
    });
    
    // Event listener for when the modal is hidden
    document.getElementById('tradingModal').addEventListener('hide.bs.modal', function (event) {
      console.log('Modal is hidden');
    });
    
    // Event listener for form submission
    tradingForm.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log('Form submitted');
      tradingModal.hide(); // Hide the modal after form submission
    });
  });





// Javascript Functions for when all content is loaded:

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize timer variables
    let minutes = 3; // because we're starting at 03:00, which is 2 minutes and 60 seconds
    let seconds = 0;

    // Update the display
    const updateDisplay = () => {
        document.getElementById('countdown-timer').textContent = 
            (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    // Call updateDisplay once at the start to ensure the timer is displayed
    updateDisplay();

    const countdown = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown); // Clear the interval
                // Creating end of game variables
                let finalPrice = 100; /* Placeholder for logic to determine final price */
                let finalScore = 540; /*placeholder for logic to determine final pnl */
                let achievement = 'Awesome!' /* *placeholder for logic to determine achievment */;
                alert(`The game round has ended! The final Price is: ${finalPrice}. The final score is: ${finalScore}. You have achieved ${achievement}!`); // Display the end of round message
            } else {
                minutes--;    // Decrement a minute
                seconds = 59; // Reset seconds
            }
        } else {
            seconds--; // Decrement seconds
        }

        updateDisplay(); // Update the timer display

    }, 1000); // Set the interval to tick every second
});
