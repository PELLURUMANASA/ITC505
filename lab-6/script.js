// Wait for the document to be fully loaded before running the code
document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const refreshButton = document.getElementById('refreshButton');
    const output = document.getElementById('output');
    const numberInput = document.getElementById('numberInput');
    
    // Function to handle the sorting and displaying the result
    actionButton.addEventListener('click', () => {
        // Get the input value and split the numbers by commas
        let numbers = numberInput.value.split(',').map(num => num.trim());

        // Check if all inputs are valid numbers
        if (numbers.every(num => !isNaN(num))) {
            // Convert all numbers to integers and sort them
            let sortedNumbers = numbers.map(num => parseInt(num)).sort((a, b) => a - b);
            
            // Display the sorted numbers in the output paragraph
            output.textContent = 'Sorted Numbers: ' + sortedNumbers.join(', ');
        } else {
            output.textContent = 'Please enter valid numbers separated by commas.';
        }
    });

    // Function to clear the input and output for a "refresh"
    refreshButton.addEventListener('click', () => {
        numberInput.value = '';  // Clear the input field
        output.textContent = '';  // Clear the output text
    });

    // Dynamically update the last modified date in the footer
    const lastModifiedElement = document.getElementById('lastModified');
    const lastModifiedDate = document.lastModified;
    lastModifiedElement.textContent = lastModifiedDate;
});
