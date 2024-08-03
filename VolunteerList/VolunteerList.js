document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/volunteer')
        .then(response => response.json())
        .then(data => displayVolunteer(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayVolunteer(volunteer) {
    const tableContainer = document.getElementById('volunteers-table');
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Full Name', 'Username', 'Email', 'Password', 'Address 1', 'Address 2', 'City', 'State', 'Zipcode', 'Preferences', 'Availability', 'Skills'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    volunteer.forEach(volunteer => {
        const row = document.createElement('tr');

        Object.values(volunteer).forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

document.getElementById('v_download-pdf').addEventListener('click', () => {
    fetch('/api/v_download-pdf')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'volunteer.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error downloading PDF:', error));
});

document.getElementById('v_download-csv').addEventListener('click', () => {
    fetch('/api/v_download-csv')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'volunteer.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error downloading CSV:', error));
});
