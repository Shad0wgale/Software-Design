document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/loginadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
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
                messageDiv.textContent = 'Login successful!';
                messageDiv.style.color = 'green';
                window.location.href = 'VolunteerMatching.html';
            } else {
                messageDiv.textContent = result.message || 'Login failed.';
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


