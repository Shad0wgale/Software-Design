const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3011;

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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.error('Validation error: All fields are required.');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO volunteers (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error.', error: err.sqlMessage });
        }
        console.log('Volunteer registration successful:', results);
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

    const sql = 'SELECT * FROM volunteers WHERE email = ? AND password = ?';
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

// Handle errors
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error.', error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
