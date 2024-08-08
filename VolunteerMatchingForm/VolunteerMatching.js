document.addEventListener('DOMContentLoaded', async function() {
    // Define and initialize select elements
    const volunteerSelect = document.getElementById('volunteer');
    const eventSelect = document.getElementById('event');
    
    // Fetch and populate volunteers
    try {
        let response = await fetch('/api/volunteer');
        let volunteers = await response.json();
        volunteers.forEach(volunteer => {
            let option = document.createElement('option');
            option.value = volunteer.id;
            option.textContent = volunteer.fullname;
            volunteerSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading volunteers:', error);
        alert('Could not load volunteers. Please check the console for more details.');
    }

    // Fetch and populate events
    try {
        let response = await fetch('/api/events');
        let events = await response.json();
        events.forEach(event => {
            let option = document.createElement('option');
            option.value = event.id; // Ensure this is the event ID
            option.textContent = event.title; // Display event title
            eventSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading events:', error);
        alert('Could not load events. Please check the console for more details.');
    }

    // Handle form submission
    document.getElementById('matchingForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const volunteerId = volunteerSelect.value;
        const eventId = eventSelect.value;
    
        console.log('Volunteer ID:', volunteerId);
        console.log('Event ID:', eventId);
    
        if (!eventId || !volunteerId) {
            alert('Please select both a volunteer and an event.');
            return;
        }
    
        try {
            const result = await fetch('/api/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ volunteerId, eventId })
            });
    
            const message = await result.text();
            alert(message);
        } catch (error) {
            console.error('Error creating match:', error);
            alert('Error creating match. Please check the console for more details.');
        }
    });

    // Navigation and logout
    document.querySelector('nav a[href="VolunteerMatching.html"]').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'VolunteerMatching.html';
    });

    document.querySelector('nav a[href="Event_Management_Form.html"]').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'Event_Management_Form.html';
    });

    document.querySelector('nav a[href="main.html"]').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'main.html';
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        // Optional: Clear session storage or cookies here
        console.log('User logged out');
    });
});