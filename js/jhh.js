
const { app, BrowserWindow, ipcMAin } = require('electron');
const path = require('path');

let jhhWindow;

function creatWindow() {
    jhhWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
          show: false,
        });

        jhhWindow.loadFile("jhh.html");
  
        // To maximize the window
        jhhWindow.maximize();
        jhhWindow.show(); 
}
// Function to create child window of parent one
function createChildWindow() {
    childWindow = new BrowserWindow({
      width: 800,
      height: 1920,
      modal: true,
      show: false,
      parent: jhhWindow, // Make sure to add parent window here
    
      // Make sure to add webPreferences with below configuration
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
    
   
    
  app.whenReady().then(() => {
    createWindow();
    
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
    
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

}