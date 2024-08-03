const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3014;
const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the Login directory
const loginDir = path.join(__dirname, '../Login');
console.log('Serving static files from:', loginDir);
app.use(express.static(loginDir));

const volunteerMatchingDir = path.join(__dirname, '../VolunteerMatchingForm');
console.log('Serving static files from:', volunteerMatchingDir);
app.use(express.static(volunteerMatchingDir));

const mainDir = path.join(__dirname, '../Main');
console.log('Serving static files from:', mainDir);
app.use(express.static(mainDir));

const eventManagementDir = path.join(__dirname, '../EventManagementForm');
console.log('Serving static files from:', eventManagementDir);
app.use(express.static(eventManagementDir));

const volunteerHistoryDir = path.join(__dirname, '../VolunteerHistory');
console.log('Serving static files from:', volunteerHistoryDir);
app.use(express.static(volunteerHistoryDir));

const volunteerListDir = path.join(__dirname, '../VolunteerList');
console.log('Serving static files from:', volunteerListDir);
app.use(express.static(volunteerListDir));

const eventsDir = path.join(__dirname, '../Events');
console.log('Serving static files from:', eventsDir);
app.use(express.static(eventsDir));

// Database connection
const db = mysql.createConnection({
    host: 'volunteerdb.c2xxqupom1xx.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Password1234',
    database: 'VolunteerDB'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process if unable to connect to the database
    }
    console.log('Database connected');
});

// Handle registration for admins
app.post('/registeradmin', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.error('Validation error: All fields are required.');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        console.log('Admin registration successful:', results);
        res.json({ success: true, message: 'Registration successful!' });
    });
});

// Handle registration for volunteers
app.post('/registervolunteer', (req, res) => {
    const { fullname, username, email, password, address1, address2, city, state, zipcode, preferences, availability, skills } = req.body;

    if (!fullname|| !username || !email || !password || !address1 || !city || !state || !zipcode || !availability || !skills) {
        console.error('Validation error: All fields are required.');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const skillsJson = JSON.stringify(skills);

    const sql = 'INSERT INTO volunteer (fullname, username, email, password, address1, address2, city, state, zipcode, preferences, availability, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [fullname, username, email, password, address1, address2 || '', city, state, zipcode, preferences || '', availability, skillsJson], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        console.log('Volunteer registration successful:', results);
        res.json({ success: true, message: 'Registration successful!' });
    });
});

// Handle registration for events
app.post('/registerevent', (req, res) => {
    const { eventname, eventdescription, address1, address2, city, state, zipcode, skills, urgency, eventdate } = req.body;

    if (!eventname || !eventdescription || !address1 || !city || !state || !zipcode || !skills || !urgency || !eventdate) {
        console.error('Validation error: All fields are required.');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO events (eventname, eventdescription, address1, address2, city, state, zipcode, skills, urgency, eventdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [eventname, eventdescription, address1, address2 || '', city, state, zipcode || '', skills, urgency, eventdate], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        console.log('Event registration successful:', results);
        res.json({ success: true, message: 'Registration successful!' });
    });
});

// Handle login for admins
app.post('/loginadmin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        if (results.length > 0) {
            console.log('Login successful:', results);
            res.json({ success: true, message: 'Login successful!' });
        } else {
            console.log('Invalid email or password');
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    });
});

// Handle login for volunteers
app.post('/loginvolunteer', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'SELECT * FROM volunteer WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        if (results.length > 0) {
            console.log('Login successful:', results);
            res.json({ success: true, message: 'Login successful!' });
        } else {
            console.log('Invalid email or password');
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    });
});

// Handle volunteer history fetching
app.get('/api/volunteer-history', (req, res) => {
    const sql = 'SELECT * FROM volunteer_history';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json(results);
    });
});

// Handle events fetching
app.get('/api/events', (req, res) => {
    const sql = 'SELECT eventname, eventdescription, address1, address2, city, state, zipcode, skills, urgency, eventdate FROM events';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        // Transform data into FullCalendar format
        const events = results.map(event => ({
            title: event.eventname,
            start: event.eventdate,
            end: event.eventdate,  // Assuming single-day events; adjust if needed
            extendedProps: {
                description: event.eventdescription,
                location: `${event.address1} ${event.address2}, ${event.city}, ${event.state} ${event.zipcode}`,
                requiredskills: event.skills,
                urgency: event.urgency
            }
        }));

        res.json(events);
    });
});

app.get('/api/volunteer', (req, res) => {
    const sql = 'SELECT * FROM volunteer';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json(results);
    });
});

app.get('/volunteer', (req, res) => {
    res.sendFile(path.join(volunteerPageDir, 'VolunteerList.html'));
});

function createTableHeaders(doc, headers, startX, startY, columnWidth, rowHeight) {
    doc.fontSize(10).font('Helvetica-Bold');

    headers.forEach((header, i) => {
        doc.text(header, startX + i * columnWidth, startY, { width: columnWidth, align: 'left' });
        doc.rect(startX + i * columnWidth, startY, columnWidth, rowHeight).stroke();
    });
}

// Helper function to create table rows
function createTableRow(doc, row, startX, startY, columnWidth, rowHeight) {
    doc.fontSize(8).font('Helvetica');

    Object.values(row).forEach((text, i) => {
        doc.text(String(text), startX + i * columnWidth, startY, { width: columnWidth, align: 'left' });
        doc.rect(startX + i * columnWidth, startY, columnWidth, rowHeight).stroke();
    });
}

// Handle PDF download
app.get('/api/v_download-pdf', (req, res) => {
    const sql = 'SELECT * FROM volunteer';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
        const filename = 'volunteer.pdf';

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // Define table properties
        const tableStartX = 10;
        const tableStartY = 80;
        const columnWidth = 60;  // Adjusted column width
        const rowHeight = 40;   // Adjusted row height
        const headers = ['ID', 'Full Name', 'Username', 'Email', 'Password', 'Address 1', 'Address 2', 'City', 'State', 'Zipcode', 'Preferences', 'Availability', 'Skills'];

        // Table Headers
        createTableHeaders(doc, headers, tableStartX, tableStartY, columnWidth, rowHeight);

        // Table Rows
        results.forEach((volunteer, index) => {
            const rowY = tableStartY + (index + 1) * rowHeight;
            createTableRow(doc, volunteer, tableStartX, rowY, columnWidth, rowHeight);
        });

        doc.end();
    });
});

app.get('/api/v_download-csv', (req, res) => {
    const sql = 'SELECT * FROM volunteer';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        const csvWriter = createObjectCsvWriter({
            path: 'volunteer.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'fullname', title: 'Full Name' },
                { id: 'username', title: 'Username' },
                { id: 'email', title: 'Email' },
                { id: 'password', title: 'Password' },
                { id: 'address1', title: 'Address 1' },
                { id: 'address2', title: 'Address 2' },
                { id: 'city', title: 'City' },
                { id: 'state', title: 'State' },
                { id: 'zipcode', title: 'Zipcode' },
                { id: 'preferences', title: 'Preferences' },
                { id: 'availability', title: 'Availability' },
                { id: 'skills', title: 'Skills' },
            ]
        });

        csvWriter.writeRecords(results)
            .then(() => {
                res.download('volunteer.csv', 'volunteer.csv', (err) => {
                    if (err) {
                        console.error('Error downloading CSV:', err);
                        res.status(500).json({ success: false, message: 'Error downloading CSV.' });
                    } else {
                        fs.unlinkSync('volunteer.csv'); // Delete the file after download
                    }
                });
            })
            .catch(err => {
                console.error('Error writing CSV:', err);
                res.status(500).json({ success: false, message: 'Error writing CSV.' });
            });
    });
});

app.get('/api/eventsList', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json(results);
    });
});

app.get('/eventsList', (req, res) => {
    res.sendFile(path.join(eventsPageDir, 'Events.html'));
});

function createTableHeaders(doc, headers, startX, startY, columnWidth, rowHeight) {
    doc.fontSize(10).font('Helvetica-Bold');

    headers.forEach((header, i) => {
        doc.text(header, startX + i * columnWidth, startY, { width: columnWidth, align: 'left' });
        doc.rect(startX + i * columnWidth, startY, columnWidth, rowHeight).stroke();
    });
}

// Helper function to create table rows
function createTableRow(doc, row, startX, startY, columnWidth, rowHeight) {
    doc.fontSize(8).font('Helvetica');

    Object.values(row).forEach((text, i) => {
        doc.text(String(text), startX + i * columnWidth, startY, { width: columnWidth, align: 'left' });
        doc.rect(startX + i * columnWidth, startY, columnWidth, rowHeight).stroke();
    });
}

// Handle PDF download
app.get('/api/e_download-pdf', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
        const filename = 'events.pdf';

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // Define table properties
        const tableStartX = 10;
        const tableStartY = 80;
        const columnWidth = 60;  // Adjusted column width
        const rowHeight = 40;   // Adjusted row height
        const headers = ['ID', 'Event Name', 'Description', 'Address 1', 'Address 2', 'City', 'State', 'Zipcode', 'Skills', 'Urgency', 'Event Date'];

        // Table Headers
        createTableHeaders(doc, headers, tableStartX, tableStartY, columnWidth, rowHeight);

        // Table Rows
        results.forEach((events, index) => {
            const rowY = tableStartY + (index + 1) * rowHeight;
            createTableRow(doc, events, tableStartX, rowY, columnWidth, rowHeight);
        });

        doc.end();
    });
});

app.get('/api/e_download-csv', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        const csvWriter = createObjectCsvWriter({
            path: 'events.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'eventname', title: 'Event Name' },
                { id: 'eventdescription', title: 'Description' },
                { id: 'address1', title: 'Address 1' },
                { id: 'address2', title: 'Address 2' },
                { id: 'city', title: 'City' },
                { id: 'state', title: 'State' },
                { id: 'zipcode', title: 'Zipcode' },
                { id: 'skills', title: 'Skills' },
                { id: 'urgency', title: 'Urgency' },
                { id: 'eventdate', title: 'Event Date' },
            ]
        });

        csvWriter.writeRecords(results)
            .then(() => {
                res.download('events.csv', 'events.csv', (err) => {
                    if (err) {
                        console.error('Error downloading CSV:', err);
                        res.status(500).json({ success: false, message: 'Error downloading CSV.' });
                    } else {
                        fs.unlinkSync('events.csv'); // Delete the file after download
                    }
                });
            })
            .catch(err => {
                console.error('Error writing CSV:', err);
                res.status(500).json({ success: false, message: 'Error writing CSV.' });
            });
    });
});

// Handle errors
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error.', error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
