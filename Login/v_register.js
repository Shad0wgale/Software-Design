document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/registervolunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Response JSON:', result);

        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            if (result.success) {
                messageDiv.textContent = 'Registration successful!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = result.message || 'Registration failed.';
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.textContent = 'Failed to parse server response.';
        }
    }
});