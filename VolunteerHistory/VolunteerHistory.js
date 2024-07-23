$(document).ready(function() {
    // Fetch volunteer history data from the server
    $.ajax({
        url: '/api/volunteer-history',
        method: 'GET',
        success: function(data) {
            const $tbody = $('#volunteer-history-table tbody');
            data.forEach(record => {
                $tbody.append(`
                    <tr>
                        <td>${record.eventName}</td>
                        <td>${record.date}</td>
                        <td>${record.location}</td>
                        <td>${record.description}</td>
                        <td>${record.status}</td>
                    </tr>
                `);
            });
        },
        error: function(error) {
            console.error('Error fetching volunteer history:', error);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav a[href="Profile_Management.html"]').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'Profile_Management.html';
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav a[href="VolunteerHistory.html"]').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'VolunteerHistory.html';
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav a[href="main.html"]').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'main.html';
    });
  });
