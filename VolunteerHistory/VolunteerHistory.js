$(document).ready(function() {
    const volunteerId = 1; // Replace with the actual logged-in volunteer ID

    // Function to fetch and display volunteer history
    function fetchVolunteerHistory() {
        $.ajax({
            url: `/api/volunteer-history/${volunteerId}`,
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

    // Initially fetch volunteer history on page load
    fetchVolunteerHistory();

    // Refresh history when "View History" button is clicked
    $('#view-history-button').on('click', function() {
        fetchVolunteerHistory();
    });
});
