document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address1 = document.getElementById('address1').value;
    const address2 = document.getElementById('address2').value || '';
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zipcode').value;
    const preferences = document.getElementById('preferences').value || '';
    const availability = document.getElementById('availability').value;
    const skills = document.getElementById('skills').value;

    try {
        const response = await fetch('/registervolunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, username, email, password, address1, address2, city, state, zipcode, preferences, availability, skills})
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
