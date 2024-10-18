let isOn = false; // Initial state of the calculator is OFF

// Function to toggle the power state
function togglePower() {
    const display = document.getElementById('display');
    const powerBtn = document.getElementById('powerBtn');

    isOn = !isOn; // Toggle the power state

    if (isOn) {
        display.value = '0'; // Reset display when turned ON
        powerBtn.style.backgroundColor = '#28a745'; // Change button color to green
        display.classList.remove('off'); // Remove off class to restore original style
        display.placeholder = ''; // Remove placeholder when turned ON
    } else {
        display.value = ''; // Clear display when turned OFF
        powerBtn.style.backgroundColor = '#dc3545'; // Change button color to red
        display.classList.add('off'); // Add off class to change style
        display.placeholder = ''; // Remove placeholder when turned OFF
    }
}

// Function to append input to the display
function appendToDisplay(value) {
    if (!isOn) return; // Do nothing if the calculator is OFF

    const display = document.getElementById('display');
    if (display.value === '0' || display.value === 'Error') {
        display.value = value; // Replacing the default '0' or 'Error' with the first input
    } else {
        display.value += value; // Adding the new input to the display
    }
}

// Function to clear the display
function clearDisplay() {
    if (!isOn) return; // Do nothing if the calculator is OFF
    document.getElementById('display').value = '0'; // Resetting the display to default
}

// Function to delete the last character from the display
function deleteLast() {
    if (!isOn) return; // Do nothing if the calculator is OFF
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1) || '0'; // Removing the last character or resetting to '0'
}

// Function to calculate the result of the expression
function calculateResult() {
    if (!isOn) return; // Do nothing if the calculator is OFF
    const display = document.getElementById('display');
    try {
        let expression = display.value.replace('x', '*'); // Replacing 'x' with '*' for multiplication
        expression = expression.replace(/sqrt\(([^)]+)\)/, 'Math.sqrt($1)'); // Handling square root
        display.value = eval(expression); // Evaluating the expression
    } catch (error) {
        display.value = 'Error'; // Handling any errors that occur during evaluation
    }
}

// Adding keyboard support for calculator
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isOn) return; // Do nothing if the calculator is OFF

    if ('0123456789+-*/().'.includes(key)) {
        appendToDisplay(key); // Appending key to display
    } else if (key === 'Backspace') {
        deleteLast(); // Handling backspace for delete
    } else if (key === 'Enter') {
        calculateResult(); // Handling enter for calculation
    } else if (key === 'Escape') {
        clearDisplay(); // Handling escape for clear
    } else if (key === 's') {
        appendToDisplay('sqrt('); // Adding square root with 's'
    } else if (key === 'p') {
        appendToDisplay('**'); // Adding power with 'p'
    }
});

// Initialize the display and button state when the page loads
window.onload = function() {
    const display = document.getElementById('display');
    display.value = ''; // Ensure the display is empty when off
    display.classList.add('off'); // Add off class to change display to black
    const powerBtn = document.getElementById('powerBtn');
    powerBtn.style.backgroundColor = '#dc3545'; // Set button color to red for OFF state
};
