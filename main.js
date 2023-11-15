const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  const db = new sqlite3.Database(path.join(__dirname, "db.db"));

  ipcMain.handle("fetchDataFromMain", async (event, args) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  });
  // Adding a new User
  ipcMain.handle("addUserFromRenderer", async (event, name, email) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (name, email) VALUES (?, ?)";
      db.run(query, [name, email], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });

  // Deleting User
   ipcMain.handle("deleteUser", async (event, id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE id = ?";
      db.run(query, [id], (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });

  mainWindow.on("closed", () => {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Closed the database connection.");
    });
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
