document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/eventsList')
        .then(response => response.json())
        .then(data => displayEvents(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayEvents(events) {
    const tableContainer = document.getElementById('events-table');
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Event Name', 'Description', 'Address 1', 'Address 2', 'City', 'State', 'Zipcode', 'Skills', 'Urgency', 'Event Date'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    events.forEach(events => {
        const row = document.createElement('tr');

        Object.values(events).forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

document.getElementById('e_download-pdf').addEventListener('click', () => {
    fetch('/api/e_download-pdf')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'events.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error downloading PDF:', error));
});

document.getElementById('e_download-csv').addEventListener('click', () => {
    fetch('/api/e_download-csv')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'events.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error downloading CSV:', error));
});
