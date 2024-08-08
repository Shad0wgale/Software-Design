// yourScriptFile.js (adjust the path as needed)
function displayAvailableEvents(events) {
    const eventListContainer = document.querySelector('#available-events-list');
    eventListContainer.innerHTML = ''; // Clear any existing content

    events.forEach((event, index) => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');

        eventItem.innerHTML = `
            <input type="checkbox" id="event-${index}" name="event" value="${event.eventName}">
            <label for="event-${index}">${event.eventName} - ${event.date} - ${event.location}</label>
        `;

        eventListContainer.appendChild(eventItem);
    });
}

module.exports = { displayAvailableEvents };
