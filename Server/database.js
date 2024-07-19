const mysql = require("mysql");
let instance = null;

const db = mysql.createConnection({
    host: 'volunteerdb.c2xxqupom1xx.us-east-2.rds.amazonaws.com', 
    port: 3306,
    user: 'admin', 
    password: 'Password1234',
    database: 'VolunteerDB' 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    
    // Test the connection with a simple query
    db.query('SELECT NOW() AS currentTime', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Current time from database:', results[0].currentTime);
        // Close the connection
        db.end();
    });
});



  
