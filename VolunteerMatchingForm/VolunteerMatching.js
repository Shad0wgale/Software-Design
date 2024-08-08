document.addEventListener('DOMContentLoaded', async function() {
  const volunteerSelect = document.getElementById('volunteer');
  
  // Fetch and populate volunteers
  let response = await fetch('/api/volunteer');
  let volunteers = await response.json();
  volunteers.forEach(volunteer => {
      let option = document.createElement('option');
      option.value = volunteer.id;
      option.textContent = volunteer.fullname;
      volunteerSelect.appendChild(option);
  });

  // Handle form submission
  document.getElementById('matchingForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      const volunteerId = volunteerSelect.value;
      const eventId = eventSelect.value;

      const result = await fetch('/api/match', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ volunteerId, eventId })
      });

      const message = await result.text();
      alert(message);
  });
});

$(document).ready(function() {
    const volunteerProfiles = {
        "John Doe": {
            matchedEvent: "Community Clean-Up"
        },
        "Jane Smith": {
            matchedEvent: "Food Drive"
        }
    };

    const volunteerName = "John Doe";  // This would be dynamically set based on the current volunteer
    const matchedEvent = volunteerProfiles[volunteerName].matchedEvent;

    $('#volunteer-name').val(volunteerName);
    $('#matched-event').val(matchedEvent);
});

// Sample data for volunteers and events

// Function to find the best match for a volunteer
function findBestMatch(volunteer) {
    let bestMatch = null;
    let maxSkillsMatched = 0;

    events.forEach(event => {
        const skillsMatched = event.requiredSkills.filter(skill => volunteer.skills.includes(skill)).length;

        // Check if this event has more matched skills than the current best
        if (skillsMatched > maxSkillsMatched) {
            maxSkillsMatched = skillsMatched;
            bestMatch = event;
        }
    });

    return bestMatch; // Will return the best match or null
}

//module.exports = { findBestMatch, volunteers, events };

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav a[href="VolunteerMatching.html"]').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'VolunteerMatching.html';
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav a[href="Event_Management_Form.html"]').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'Event_Management_Form.html';
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav a[href="main.html"]').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'main.html';
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
      // Optional: Clear session storage or cookies here
      // sessionStorage.clear();
      // document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log('User logged out');
    });

});


document.addEventListener('DOMContentLoaded', async function() {
const eventSelect = document.getElementById('event');

try {
    // Fetch events from the API
    let response = await fetch('http://localhost:3008/api/events');
    if (!response.ok) throw new Error('Failed to fetch events');
    let events = await response.json();

    console.log(events); // Debug: Check what is being fetched

    // Populate the dropdown with event titles
    events.forEach(event => {
        let option = document.createElement('option');
        option.value = event.title; // You may want to use a unique identifier instead
        option.textContent = event.title; // Display event title
        eventSelect.appendChild(option);
    });
} catch (error) {
    console.error('Error loading events:', error);
    alert('Could not load events. Please check the console for more details.');
}
});