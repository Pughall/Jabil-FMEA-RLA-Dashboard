const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

const db = mysql.createConnection({
  host: 'awase1penatd01',
  user: 'remote2',
  password: 'rlsys2@jbl',
  database: 'rlsys'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', (req, res) => {
  let sql = 'SELECT * FROM exceldata';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});