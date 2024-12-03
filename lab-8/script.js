document.getElementById('secureForm').addEventListener('submit', function (event) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Prevent form submission if any field is empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('All fields are required.');
        event.preventDefault();
        return;
    }

    // Validate first and last names do not contain numbers (XSS prevention)
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(firstName)) {
        alert('First name cannot contain numbers.');
        event.preventDefault();
        return;
    }
    if (!namePattern.test(lastName)) {
        alert('Last name cannot contain numbers.');
        event.preventDefault();
        return;
    }

    // Validate email format (XSS prevention)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
        return;
    }

    // Validate password format (Password strength + XSS prevention)
    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and include at least one special character.');
        event.preventDefault();
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        event.preventDefault();
        return;
    }

    // Clean input to prevent XSS (encode special characters)
    function sanitizeInput(input) {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Sanitize inputs before processing (SQLi & XSS prevention)
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedEmail = sanitizeInput(email);

    console.log('Sanitized Data:');
    console.log('First Name:', sanitizedFirstName);
    console.log('Last Name:', sanitizedLastName);
    console.log('Email:', sanitizedEmail);

    // Show Thank You section and hide the form
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('thankYouSection').style.display = 'block';
});

// Handle "Go Back to the Form" link
document.getElementById('backToForm').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('thankYouSection').style.display = 'none';
    document.getElementById('formSection').style.display = 'block';
});

