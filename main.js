const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      contextIsolation: false, // Disable context isolation to allow direct use of Node.js in the renderer
    }
  });

  win.loadFile('index.html');
}

// Array of image filenames with paths relative to the root directory
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
let currentIndex = 0;

// IPC handlers
ipcMain.handle('get-current-image', () => {
  return images[currentIndex];
});

ipcMain.on('next-image', () => {
  currentIndex = (currentIndex + 1) % images.length;
});

ipcMain.on('prev-image', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
