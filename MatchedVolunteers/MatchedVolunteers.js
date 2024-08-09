document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/matches')
        .then(response => response.json())
        .then(data => displayMatches(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayMatches(matches) {
    const tableContainer = document.getElementById('matches-table');
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Volunteer ID', 'Event ID'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    matches.forEach(matches => {
        const row = document.createElement('tr');

        Object.values(matches).forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

document.getElementById('mv_download-pdf').addEventListener('click', () => {
    fetch('/api/mv_download-pdf')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'matchedVolunteer.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error downloading PDF:', error));
});

document.getElementById('mv_download-csv').addEventListener('click', () => {
    fetch('/api/mv_download-csv')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'matchedVolunteer.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error downloading CSV:', error));
});
