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
