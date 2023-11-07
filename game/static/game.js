
// Javascript Functions for when all content is loaded:

document.addEventListener('DOMContentLoaded', (event) => {
    // 1) Popover Set up : Set up help guide that is dismissed on next click
    var helpLink = document.getElementById('helpLink');
    var popover = new bootstrap.Popover(helpLink, {
        trigger: 'focus',
        title: 'Help',
        content: 'Bid = Price You Are Willing To Pay \
                      Offer = Price You Are Willing To Sell'
    });

    // 2) Timer Countdown Setup:
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

    // 3) Intercept the bidoffer form submission and send via AJAX
    const bidOfferForm = document.getElementById('bid-offer-form'); // Referencing the bid offer form element id in game.html
    bidOfferForm.addEventListener('submit', function(e){
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // 'this' refers to the bid offer form

        fetch('/update-bid-offer/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken') // Function to get CSRF token from cookies
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);               
            }
            return response.json();
        })
        .then(data => {
            // Use the addBidOfferToTable function here with the data recieved 
            addBidOfferToTable(data.bid,data.offer);
        })
        .catch(error => {
            console.error('There has been a problem with the fetch operation', error);
        });
    });

    // 4) This function is called when the bid offer form data is recieved from the AJAX response
    function addBidOfferToTable(bid,offer){
        // Find table body
        var tableBody = document.querySelector('#trading-table tbody');
        // Create a new row
        var row = document.createElement('tr');
        // Add player name cell
        var playerNameCell = row.insertCell(0);
        playerNameCell.textContent = 'Your player name'; // Replace with auth user name
        // Add the bid cell
        var bidCell = row.insertCell(1);
        bidCell.textContent = '$' + bid;
        // Add an action cell for hitting the bid
        var hitBidCell = row.insertCell(2);
        hitBidCell.appendChild(createActionButton('Hit Bid'));
        // Add the offer cell
        var offerCell = row.insertCell(3);
        offerCell.textContent = '$' + offer;
        // Add an action cell for lifting the offer
        var liftOfferCell = row.insertCell(4);
        liftOfferCell.appendChild(createActionButton('Lift Offer'));
        // Append the new row to the table body
        tableBody.appendChild(row);
    }

    // 4.a) Helper function to create an action button
    function createActionButton(text) {
        var button = document.createElement('button');
        button.textContent = text;
        // Add any event listeners or attributes here
        return button;
    }

    // 4.b) Helper function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // 5) This function randomly selects news messages to populate the news reel:

    // Setting up a static array of news messages
    const newsMessages = [
        "Spotlight on European Refineries: Margins take precedence over extended maintenance.",
        "Gasoline arbitrage sees minimal activity due to Europe's tightened supply.",
        "FCC disruptions reported at Equinor and Repsol facilities.",
        "Preem initiates scheduled maintenance at its flagship Gothenburg facility.",
        "Shutdowns projected for the US Gulf region this upcoming fall.",
        "MBS highlights Saudi Arabia's role in OPEC's market stabilization efforts.",
        "Riyadh commits to maintaining its 1 million bpd cut till year's end.",
        "China's marine fuel market flourishes, paralleling historic crude processing numbers.",
        "ARA reveals a noticeable decline in gasoline reserves; gasoil holds steady.",
        "Norway crude production dips, per latest monthly data.",

    ]

    // Function to pick a random message from the array
    function getRandomNewsMessage(newsMessages) {
        const index = Math.floor(Math.random() * newsMessages.length);
        return newsMessages[index];
    }

    // Function to update the news reel with a new message
    function updateNewsReel(message) {
        const newsReel = document.querySelector('.news-reel-container ol');
        const newListItem = document.createElement('li');
        newListItem.textContent = message;
        newsReel.appendChild(newListItem);
    }

    // Initialize a counter
    let messageCount = 0;
    const maxMessages = 4;

    // Function to start the message release process
    function startMessageRelease() {
        const intervalId = setInterval(() => {
            if (messageCount < maxMessages) {
                const message = getRandomNewsMessage(newsMessages);
                updateNewsReel(message);
                messageCount++;
            } else {
                clearInterval(intervalId); // Stop after four messages
            }
        }, 20000); // 20 seconds
    }



    // Start the process
    startMessageRelease();

});
