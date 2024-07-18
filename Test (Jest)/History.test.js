const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');
const { getVolunteerHistory, addVolunteerEntry, updateVolunteerEntry } = require('./History');

// Load the HTML file for testing
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1">
  <title>Volunteer History</title>
</head>
<body>
  <table id="volunteer-history-table">
    <thead>
      <tr>
        <th>Event Name</th>
        <th>Date</th>
        <th>Location</th>
        <th>Description</th>
        <th>Participation Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- Rows will be added here by JavaScript -->
    </tbody>
  </table>
</body>
</html>
`;

describe('Volunteer History Functions', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM(html);
        document = dom.window.document;
        global.document = document;
    });

    test('should retrieve data from the table', () => {
        addVolunteerEntry('Event 1', '2024-07-18', 'Location 1', 'Description 1', 'Status 1');
        addVolunteerEntry('Event 2', '2024-07-19', 'Location 2', 'Description 2', 'Status 2');
        
        const history = getVolunteerHistory();
        
        expect(history).toEqual([
            { eventName: 'Event 1', date: '2024-07-18', location: 'Location 1', description: 'Description 1', status: 'Status 1' },
            { eventName: 'Event 2', date: '2024-07-19', location: 'Location 2', description: 'Description 2', status: 'Status 2' }
        ]);
    });

    test('should add a new entry to the table', () => {
        addVolunteerEntry('New Event', '2024-07-20', 'New Location', 'New Description', 'New Status');
        
        const rows = document.querySelectorAll('#volunteer-history-table tbody tr');
        const lastRow = rows[rows.length - 1];
        
        expect(lastRow.querySelector('input[id^="event-name"]').value).toBe('New Event');
        expect(lastRow.querySelector('input[id^="date"]').value).toBe('2024-07-20');
        expect(lastRow.querySelector('input[id^="location"]').value).toBe('New Location');
        expect(lastRow.querySelector('input[id^="description"]').value).toBe('New Description');
        expect(lastRow.querySelector('input[id^="status"]').value).toBe('New Status');
    });

    test('should update an existing entry by index', () => {
        addVolunteerEntry('Old Event', '2024-07-21', 'Old Location', 'Old Description', 'Old Status');
        updateVolunteerEntry(1, 'Updated Event', '2024-07-22', 'Updated Location', 'Updated Description', 'Updated Status');
        
        const row = document.querySelector('#volunteer-history-table tbody tr:nth-child(1)');
        const cells = row.querySelectorAll('input');
        
        expect(cells[0].value).toBe('Updated Event');
        expect(cells[1].value).toBe('2024-07-22');
        expect(cells[2].value).toBe('Updated Location');
        expect(cells[3].value).toBe('Updated Description');
        expect(cells[4].value).toBe('Updated Status');
    });
});
