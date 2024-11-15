const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  });

  // Use loadFile instead of loadURL
  win.loadFile(path.join(__dirname, 'dist/dev-tools/browser/index.html'));

  // Open DevTools automatically
  win.webContents.openDevTools();

  win.setAutoHideMenuBar(true);
  win.setMenuBarVisibility(false);

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
