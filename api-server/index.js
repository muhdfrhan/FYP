const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: '192.168.0.192',  // your Ubuntu VM IP
  user: 'farhan',
  password: 'Abc12345!',  // match what you created
  database: 'ZakatDB'  // replace with actual name
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// 🧪 Test route
app.get('/api/test', (req, res) => {
  db.query('SELECT * FROM STAFF', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).send('Database query failed');
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('API Server running at http://localhost:5000/api/test');
});
