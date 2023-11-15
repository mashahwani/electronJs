const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db');

// Create the 'users' table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
});
// Drop the 'users' table if it exists
// db.run('DROP TABLE IF EXISTS users', (err) => {
//     if (err) {
//       console.error('Error dropping table:', err.message);
//     } else {
//       console.log('Table dropped successfully');
//     }
//   });

db.close();
