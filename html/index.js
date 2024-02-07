// Function to scroll to the element with ID 'quote-start'
function scrollToElement() {
    var element = document.getElementById('portion1');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to hide elements within the "window-quote-container" if the checkbox is checked
function hideWindowElements() {
    var windowCheckbox = document.getElementById('window-checkbox');
    var windowContainer = document.getElementById('window-quote-container');

    if (windowCheckbox.checked) {
        // If checkbox is checked, show elements
        windowContainer.style.display = 'block';
    } else {
        // If checkbox is unchecked, hide elements
        windowContainer.style.display = 'none';
    }
}

// Function to hide elements within the "gutter-quote-container" if the checkbox is checked
function hideGutterElements() {
    var gutterCheckbox = document.getElementById('gutter-checkbox');
    var gutterContainer = document.getElementById('gutter-quote-container');

    if (gutterCheckbox.checked) {
        // If checkbox is checked, show elements
        gutterContainer.style.display = 'block';
    } else {
        // If checkbox is unchecked, hide elements
        gutterContainer.style.display = 'none';
    }
}

// Combined function triggered by the button click
function getQuote() {
    // Call calculateTotal function
    var runningTotal = calculateTotal();

    // Show loading container and hide result
    var loadingContainer = document.getElementById('loading-container');
    var totalElement = document.getElementById('total');

    loadingContainer.style.display = 'flex';
    totalElement.textContent = ' Calculating...';

    // Simulate a 1.1-second delay for the calculation
    setTimeout(function () {
        // Perform the actual calculation
        runningTotal = calculateTotal();

        // Display message and scroll to the specified element if total is $0
        if (runningTotal === 0) {
            alert("Oops, please enter the number of windows, frames, and sills.");
            scrollToPortion2(); // Call a function to scroll to the desired location
            // Preselect the input field with id "large_pane" after a short delay
            setTimeout(function () {
                document.getElementById('large_pane').focus();
            }, 500);
        } else {
            // If total is not $0, call the sendMail function
            sendMail(runningTotal);
        }

        // Hide the loading container after the delay and show the total amount
        loadingContainer.style.display = 'none';
        totalElement.style.display = 'inline';
    }, 1100);
}

// Function to validate input and ensure non-negativity
function validateInput(input) {
    input.value = Math.max(0, parseFloat(input.value) || 0);
}

// Function to calculate the total quote
function calculateTotal() {
    var runningTotal = 0;

    var quantityFields = document.querySelectorAll('.quantity-field');
    var costPerUnit = [14, 8, 6, 6, 2, 30];

    quantityFields.forEach(function (field, index) {
        var quantityValue = parseFloat(field.value) || 0;
        runningTotal += quantityValue * costPerUnit[index];
    });

    var checkbox = document.getElementById('downspout');
    if (checkbox.checked) {
        runningTotal += 40;
    }

    document.getElementById('total').textContent = runningTotal;

    return runningTotal; // Return the runningTotal value
}

// Function to handle form submission
function submitForm() {
    // Show loading container and hide result
    var loadingContainer = document.getElementById('loading-container');
    var totalElement = document.getElementById('total');

    loadingContainer.style.display = 'flex';
    totalElement.textContent = ' Calculating...';

    // Simulate a 1.1-second delay for the calculation
    setTimeout(function () {
        // Perform the actual calculation
        var runningTotal = calculateTotal(); // Store the runningTotal value

        // Display message and scroll to the specified element if total is $0
        if (runningTotal === 0) {
            alert("Oops, please enter the number of windows, frames, and sills.");
            scrollToPortion2(); // Call a function to scroll to the desired location
            // Preselect the input field with id "large_pane" after a short delay
            setTimeout(function () {
                document.getElementById('large_pane').focus();
            }, 500);
        } else {
            // If total is not $0, call the sendMail function
            sendMail(runningTotal);
        }

        // Hide the loading container after the delay and show the total amount
        loadingContainer.style.display = 'none';
        totalElement.style.display = 'inline';
    }, 1100);
}

// Function to scroll to the element with ID 'generals'
function scrollToPortion2() {
    var element = document.getElementById('portion2');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Set the default checkbox states
    document.getElementById('window-checkbox').checked = true;
    document.getElementById('gutter-checkbox').checked = false;

    // Set up event listeners for input fields
    var quantityFields = document.querySelectorAll('.quantity-field');
    quantityFields.forEach(function (field) {
        field.addEventListener('input', function () {
            validateInput(field);
            calculateTotal();
        });
    });

    // Event listener for the 'downspout' checkbox
    var checkbox = document.getElementById('downspout');
    checkbox.addEventListener('change', calculateTotal);

    // Event listener for form submission
    var quoteForm = document.getElementById('quote-form');
    quoteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Total Quote: $' + document.getElementById('total').textContent);
    });

    // Attach event listeners to checkboxes
    document.getElementById('window-checkbox').addEventListener('change', hideWindowElements);
    document.getElementById('gutter-checkbox').addEventListener('change', hideGutterElements);

    // Initialize visibility based on default checkbox states
    hideWindowElements();
    hideGutterElements();
});

function sendMail(runningTotal) {
    var params = {
        to_name: document.getElementById("to_name").value,
        email: document.getElementById("email").value,
        large_pane: document.getElementById("large_pane").value,
        small_pane: document.getElementById("small_pane").value,
        frameNum: document.getElementById("frames").value,
        sillNum: document.getElementById("sills").value,
        quoteValue: runningTotal,
    };

    const serviceID = "quote-email";
    const templateID = "quote-template1";

    emailjs.send(serviceID, templateID, params)
        .then(
            res => {
                // Reset form values or perform any other necessary actions
                document.getElementById("to_name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("large_pane").value = "";
                document.getElementById("small_pane").value = "";
                document.getElementById("frames").value = "";
                document.getElementById("sills").value = "";
                document.getElementById("total").textContent = "0";
                console.log(res);
                alert("All set! Find your quote in your email's inbox.");
            })

        .catch(err => console.log(err))
}

//Built by Jake Green//
