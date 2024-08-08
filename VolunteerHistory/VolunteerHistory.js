$(document).ready(function() {
    const volunteerId = 1; // Replace with the actual logged-in volunteer ID

    // Function to fetch and display volunteer history
    function fetchVolunteerHistory(eventId) {
        let url = `/api/volunteer-history/${volunteerId}`;
        if (eventId) {
            url += `?event_id=${eventId}`;
        }

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                const $tbody = $('#volunteer-history-table tbody');
                $tbody.empty(); // Clear existing data
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
    }

    // Fetch events for selection
    $.ajax({
        url: '/api/events',
        method: 'GET',
        success: function(data) {
            const $eventSelect = $('#event-select');
            $eventSelect.empty(); // Clear existing options
            $eventSelect.append(`<option value="">All Events</option>`); // Option to view all events
            data.forEach(event => {
                $eventSelect.append(`<option value="${event.id}">${event.title}</option>`);
            });
        },
        error: function(error) {
            console.error('Error fetching events:', error);
        }
    });

    // Fetch history when "View History" button is clicked
    $('#view-history-button').on('click', function() {
        const eventId = $('#event-select').val();
        fetchVolunteerHistory(eventId);
    });

    // Initially fetch all volunteer history on page load
    fetchVolunteerHistory();
});
