// Function to scroll to the element with ID 'portion1'
function scrollToPortion1() {
    var element = document.getElementById('quote-target');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to scroll to the element with ID 'generals'
function scrollToGenerals() {
    var element = document.getElementById('portion2');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToServices() {
    var element = document.getElementById('services');
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
    var runningTotal = calculateTotal();
    var loadingContainer = document.getElementById('loading-container');
    var inputs = [
        { id: 'to_name', message: 'Please enter your name' },
        { id: 'email', message: 'Please enter your email' },
        { id: 'phone', message: 'Please enter your phone number' },
        { id: 'address', message: 'We use your address to verify your quote' }
    ];

    loadingContainer.style.display = 'flex';
    setTimeout(function () {
        runningTotal = calculateTotal();

        for (var i = 0; i < inputs.length; i++) {
            var input = document.getElementById(inputs[i].id);

            if (input.value.trim() === "") {
                displayErrorLightbox(inputs[i].message);
                scrollToPortion1();
                setTimeout(() => input.focus(), 500);

                loadingContainer.style.display = 'none';
                return;
            }
        }

        if (runningTotal === 0) {
            displayErrorLightbox("Oops, your quote is empty.");
            scrollToGenerals();
            setTimeout(() => document.getElementById('large-pane').focus(), 500);

            loadingContainer.style.display = 'none';
            return;
        } else {
            //openLightbox()
            sendMail(runningTotal);
        }

        loadingContainer.style.display = 'none';
    }, 1100);
}

function displayErrorLightbox(message) {
    var lightbox = document.querySelector('.error-lightbox');
    var errorMessageElement = lightbox.querySelector('.error-message');

    errorMessageElement.textContent = message;
    lightbox.classList.add('show');
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

    return runningTotal;
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

//Format EmailJS variables for template 
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

    //Send Email to user specified address
    emailjs.send(serviceID, templateID, params)
        .then(
            res => {
                // Reset form values or perform and display confirmation message
                document.getElementById("to_name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("large_pane").value = "";
                document.getElementById("small_pane").value = "";
                document.getElementById("frames").value = "";
                document.getElementById("sills").value = "";
                document.getElementById("total").textContent = "0";
                console.log(res);
                alert("All set! Find your full quote breakdown in your email's inbox.");
            })

        .catch(err => console.log(err))
}

//Lightbox trigger functions for hyperlinks within quote form
document.addEventListener('DOMContentLoaded', function() {
    const openLightboxes = document.querySelectorAll('.open-lightbox');
    const closeBtns = document.querySelectorAll('.close-btn, .close-btn2');

    openLightboxes.forEach(function(openLightbox) {
        openLightbox.addEventListener('click', function() {
            const lightbox = this.parentElement.querySelector('.lightbox');
            lightbox.classList.add('show');
        });
    });

    closeBtns.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            const lightbox = this.closest('.lightbox');
            lightbox.classList.remove('show');
        });
    });
});

/* function slide() {
    console.log('slide function called')
    let sliders = document.getElementsByClassName("slider");
  
    for (let i = 0; i < sliders.length; i++) {
      let slideValue = sliders[i].value;
      let myImg = sliders[i].closest('.container').querySelector('.my-img');
  
      myImg.style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
      console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
    }
} */

/*function openLightbox() {
    console.log('NULL')
    var lightbox = document.getElementById('NULL');
    lightbox.style.display = 'block';

    // Define the texts to be displayed
    var texts = [
        "Calculating",
        "Applying discounts",
        "Finalizing",
        "Sending email",
        "All set! Find your full quote breakdown in your email's inbox. Thank you for choosing Speedy Squeegy."
    ];

    // Display texts in sequence with a 1-second delay for each
    displayTextsSequentially(texts, 0, lightbox);
}

function displayTextsSequentially(texts, index, lightbox) {
    var content = document.querySelector('NULL');
    var currentText = texts[index];
    var periods = 0;

    function animatePeriods() {
        periods = (periods + 1) % 4;

        // Check if the current text is the fifth element
        if (index === 4) {
            content.innerHTML = currentText;
        } else {
            var newText = currentText + '.'.repeat(periods);
            content.innerHTML = newText;

            // Reset the content after animation
            if (periods === 0 && newText.length > currentText.length) {
                setTimeout(function () {
                    content.innerHTML = currentText;
                }, 100);
            }
        }
    }

    // Initial display without periods
    content.innerHTML = currentText;

    // Animate periods with a 1-second interval
    var intervalId = setInterval(animatePeriods, 250);

    // Move to the next text after 1 second
    setTimeout(function () {
        clearInterval(intervalId); // Stop the current animation
        index++;

        if (index < texts.length) {
            displayTextsSequentially(texts, index, lightbox);
        } else {
            // All texts displayed, show the close button
            showCloseButton(lightbox);
        }
    }, 2000);
}*/

/*function closeLightbox() {
    var lightbox = document.getElementById('success-lightbox');
    lightbox.style.display = 'none';
}*/