document.getElementById('secureForm').addEventListener('submit', function (event) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('All fields are required.');
        event.preventDefault();
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        event.preventDefault();
        return;
    }

    // Additional security tip: Backend validation and sanitization needed!
});
