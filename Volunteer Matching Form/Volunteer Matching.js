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
