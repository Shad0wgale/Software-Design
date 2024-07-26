document.getElementById('event-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const eventname = document.getElementById('eventname').value;
    const eventdescription = document.getElementById('eventdescription').value;
    const address1 = document.getElementById('address1').value;
    const address2 = document.getElementById('address2').value || '';
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zipcode').value;
    const skills = document.getElementById('skills').value;
    const urgency = document.getElementById('urgency').value;
    const eventdate = document.getElementById('eventdate').value;

    try {
        const response = await fetch('/registerevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventname, eventdescription, address1, address2, city, state, zipcode, skills, urgency, eventdate})
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
