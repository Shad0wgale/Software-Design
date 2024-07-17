const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3006;

// MySQL database connection
const db = mysql.createConnection({
  host: 'volunteerdb.c2xxqupom1xx.us-east-2.rds.amazonaws.com', 
  user: 'admin', 
  password: 'Password1234', 
  database: 'VolunteerDB' 
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to handle JSON data
app.use(cors());
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });