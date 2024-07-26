function getVolunteerHistory() {
    const history = [];
    const rows = document.querySelectorAll('#volunteer-history-table tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('input');
        history.push({
eventName: cells[0].value,
date: cells[1].value,
location: cells[2].value,
description: cells[3].value,
status: cells[4].value
});
});

return history;
}

// Function to add a new entry to the table
function addVolunteerEntry(eventName, date, location, description, status) {
const tableBody = document.querySelector('#volunteer-history-table tbody');
const rowIndex = tableBody.rows.length + 1;
const newRow = document.createElement('tr');

newRow.innerHTML = `
<td><input type="text" id="event-name-${rowIndex}" value="${eventName}" placeholder="Event Name"></td>
<td><input type="text" id="date-${rowIndex}" value="${date}" placeholder="Date"></td>
<td><input type="text" id="location-${rowIndex}" value="${location}" placeholder="Location"></td>
<td><input type="text" id="description-${rowIndex}" value="${description}" placeholder="Description"></td>
<td><input type="text" id="status-${rowIndex}" value="${status}" placeholder="Status"></td>
`;

tableBody.appendChild(newRow);
}

// Function to update an existing entry by index
function updateVolunteerEntry(index, eventName, date, location, description, status) {
const row = document.querySelector(`#volunteer-history-table tbody tr:nth-child(${index})`);

if (row) {
const cells = row.querySelectorAll('input');
cells[0].value = eventName;
cells[1].value = date;
cells[2].value = location;
cells[3].value = description;
cells[4].value = status;
}
}

// Exporting functions for testing
module.exports = { getVolunteerHistory, addVolunteerEntry, updateVolunteerEntry };