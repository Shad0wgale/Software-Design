document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventDetailsEl = document.getElementById('event-details');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        eventTimeFormat: { // This hides the time from being displayed
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false // Hides AM/PM
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            console.log('Fetching events...');
            fetch('/api/events')
                .then(response => response.json())
                .then(data => {
                    console.log('Events data:', data);
                    successCallback(data);
                })
                .catch(err => {
                    console.error('Error fetching events:', err);
                    failureCallback(err);
                });
        },
        eventClick: function(info) {
            eventDetailsEl.innerHTML = `
                <p><strong>Event:</strong> ${info.event.title}</p>
                <p><strong>Description:</strong> ${info.event.extendedProps.description || 'N/A'}</p>
                <p><strong>Location:</strong> ${info.event.extendedProps.location || 'N/A'}</p>
                <p><strong>Required Skills:</strong> ${info.event.extendedProps.requiredskills || 'N/A'}</p>
                <p><strong>Urgency:</strong> ${info.event.extendedProps.urgency || 'N/A'}</p>
            `;
        }
    });

    calendar.render();

    document.getElementById('logoutButton').addEventListener('click', function() {
        // Optional: Clear session storage or cookies here
        // sessionStorage.clear();
        // document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log('User logged out');
    });
});
