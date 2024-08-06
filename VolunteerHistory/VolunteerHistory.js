$(document).ready(function() {
    const volunteerId = 1; // Replace with the actual logged-in volunteer ID

    // Fetch volunteer history data from the server
    $.ajax({
        url: '/api/volunteer-history',
        method: 'GET',
        success: function(data) {
            const $tbody = $('#volunteer-history-table tbody');
            data.forEach(record => {
                $tbody.append(`
                    <tr>
                        <td>${record.event_name}</td>
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

    // Fetch events for sign-up
    $.ajax({
        url: '/api/events',
        method: 'GET',
        success: function(data) {
            const $eventSelect = $('#event-select');
            data.forEach(event => {
                $eventSelect.append(`<option value="${event.id}">${event.title}</option>`);
            });
        },
        error: function(error) {
            console.error('Error fetching events:', error);
        }
    });

    // Handle event sign-up form submission
    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        const eventId = $('#event-select').val();
        $.ajax({
            url: '/api/signup-event',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ volunteer_id: volunteerId, event_id: eventId }),
            success: function(response) {
                alert(response.message);
            },
            error: function(error) {
                console.error('Error signing up for event:', error);
            }
        });
    });

    // Fetch notifications for the volunteer
    $.ajax({
        url: `/api/notifications/${volunteerId}`,
        method: 'GET',
        success: function(data) {
            data.forEach(notification => {
                alert(notification.message);
            });
        },
        error: function(error) {
            console.error('Error fetching notifications:', error);
        }
    });
});
