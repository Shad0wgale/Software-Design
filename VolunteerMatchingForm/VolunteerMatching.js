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
const volunteers = [
    { name: "John Doe", skills: ["cooking", "serving", "organizing"] },
    { name: "Jane Smith", skills: ["first aid", "teaching", "organizing"] }
];

const events = [
    { name: "Charity Dinner", requiredSkills: ["cooking", "serving"] },
    { name: "First Aid Workshop", requiredSkills: ["first aid", "teaching"] },
    { name: "Community Cleanup", requiredSkills: ["cleaning", "organizing"] }
];

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

module.exports = { findBestMatch, volunteers, events };

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