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

// Serve static files from various directories
const loginDir = path.join(__dirname, '../Login');
const volunteerMatchingDir = path.join(__dirname, '../VolunteerMatchingForm');
const mainDir = path.join(__dirname, '../Main');
const eventManagementDir = path.join(__dirname, '../EventManagementForm');
const volunteerHistoryDir = path.join(__dirname, '../VolunteerHistory');
const volunteerListDir = path.join(__dirname, '../VolunteerList');
const eventsDir = path.join(__dirname, '../Events');

app.use(express.static(loginDir));
app.use(express.static(volunteerMatchingDir));
app.use(express.static(mainDir));
app.use(express.static(eventManagementDir));
app.use(express.static(volunteerHistoryDir));
app.use(express.static(volunteerListDir));
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
        process.exit(1);
    }
    console.log('Database connected');
});

// Handle registration for admins
app.post('/registeradmin', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json({ success: true, message: 'Registration successful!' });
    });
});

// Handle registration for volunteers
app.post('/registervolunteer', (req, res) => {
    const { fullname, username, email, password, address1, address2, city, state, zipcode, preferences, availability, skills } = req.body;
    if (!fullname || !username || !email || !password || !address1 || !city || !state || !zipcode || !availability || !skills) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const skillsJson = JSON.stringify(skills);
    const sql = 'INSERT INTO volunteer (fullname, username, email, password, address1, address2, city, state, zipcode, preferences, availability, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [fullname, username, email, password, address1, address2 || '', city, state, zipcode, preferences || '', availability, skillsJson], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json({ success: true, message: 'Registration successful!' });
    });
});

// Handle registration for events
app.post('/registerevent', (req, res) => {
    const { eventname, eventdescription, address1, address2, city, state, zipcode, skills, urgency, eventdate } = req.body;
    if (!eventname || !eventdescription || !address1 || !city || !state || !zipcode || !skills || !urgency || !eventdate) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO events (eventname, eventdescription, address1, address2, city, state, zipcode, skills, urgency, eventdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [eventname, eventdescription, address1, address2 || '', city, state, zipcode || '', skills, urgency, eventdate], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json({ success: true, message: 'Registration successful!' });
    });
});

// Handle login for admins
app.post('/loginadmin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    });
});

// Handle login for volunteers
app.post('/loginvolunteer', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'SELECT * FROM volunteer WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }

        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    });
});

// Handle volunteer history fetching
app.get('/api/volunteer-history', (req, res) => {
    const sql = 'SELECT * FROM volunteer_history';
    db.query(sql, (err, results) => {
        if (err) {
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

// Handle volunteer sign-up for events
app.post('/api/signup-event', (req, res) => {
    const { volunteer_id, event_id } = req.body;
    if (!volunteer_id || !event_id) {
        return res.status(400).json({ success: false, message: 'Volunteer ID and Event ID are required.' });
    }

    const sql = 'INSERT INTO volunteer_event_signups (volunteer_id, event_id) VALUES (?, ?)';
    db.query(sql, [volunteer_id, event_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json({ success: true, message: 'Event sign-up successful!' });
    });
});

// Fetch volunteer-event assignments for admin view
app.get('/api/volunteer-event-assignments', (req, res) => {
    const sql = `
        SELECT ve.id, v.fullname, e.eventname, e.eventdate
        FROM volunteer_event_signups ve
        JOIN volunteer v ON ve.volunteer_id = v.id
        JOIN events e ON ve.event_id = e.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json(results);
    });
});

// Handle event assignment approval by admin and send notification
app.post('/api/approve-event', (req, res) => {
    const { signup_id } = req.body;
    if (!signup_id) {
        return res.status(400).json({ success: false, message: 'Signup ID is required.' });
    }

    const sqlSelect = `
        SELECT ve.volunteer_id, e.eventname
        FROM volunteer_event_signups ve
        JOIN events e ON ve.event_id = e.id
        WHERE ve.id = ?
    `;
    db.query(sqlSelect, [signup_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Signup not found.' });
        }

        const { volunteer_id, eventname } = results[0];

        const sqlInsertNotification = 'INSERT INTO notifications (volunteer_id, message) VALUES (?, ?)';
        const message = `You have been selected for the event: ${eventname}`;

        db.query(sqlInsertNotification, [volunteer_id, message], (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
            }
            res.json({ success: true, message: 'Volunteer approved and notification sent!' });
        });
    });
});

// Fetch notifications for a volunteer
app.get('/api/notifications/:volunteer_id', (req, res) => {
    const { volunteer_id } = req.params;
    const sql = 'SELECT * FROM notifications WHERE volunteer_id = ?';
    db.query(sql, [volunteer_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        res.json(results);
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
