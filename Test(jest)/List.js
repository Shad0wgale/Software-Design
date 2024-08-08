// List.js

/**
 * Displays a list of volunteers on the webpage.
 * @param {Array} volunteers - Array of volunteer objects.
 */
function displayVolunteers(volunteers) {
    const volunteerListContainer = document.querySelector('#volunteer-list');
    volunteerListContainer.innerHTML = ''; // Clear any existing content

    volunteers.forEach((volunteer, index) => {
        const volunteerItem = document.createElement('div');
        volunteerItem.classList.add('volunteer-item');

        volunteerItem.innerHTML = `
            <p>Name: ${volunteer.name}</p>
            <p>Email: ${volunteer.email}</p>
            <p>Skills: ${volunteer.skills.join(', ')}</p>
            <p>Status: ${volunteer.status}</p>
        `;

        volunteerListContainer.appendChild(volunteerItem);
    });
}

// Export the function for use in tests
module.exports = { displayVolunteers };
