// dependencies
const { app, BrowserWindow, Menu, dialog } = require("electron");
const fs = require("fs");

// allow our electron app to reload for easse of development
require("electron-reload")(__dirname);

// window
let window;

// template (duh)
const template = [
    {
        label: "Files",
        submenu: [
            {
                id: "save-file",
                enabled: false,
                accelerator: "Ctrl+S",
                label: "Save File",
                click: async()=>{
                    window.webContents.send("saveFile")
                }
            },
            {
                label: 'Open File',
                click: async () => {
                    const { filePaths } =
                        await dialog.showOpenDialog({
                            properties: ["openFile"]
                        });
                    const file = filePaths[0];
                    const contents = fs.readFileSync(file, "utf-8");
                    window.webContents.send("file", contents);
                },
            },
        ],
    },
];

// create our menu
const menu = Menu.buildFromTemplate(template);
// set our Menu object from template as our application menu
Menu.setApplicationMenu(menu);
// create window
function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    // load our index.html as our initial application page
    window.loadFile("index.html");
    window.webContents.openDevTools();

    app.on("windows-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
}

app.whenReady().then(createWindow);