// dependencies
const fs = require("fs");
const { shell } = require('election');
// https://www.electronjs.org/docs/api/ipc-renderer
const { ipcRenderer } = require("electron");

const doc = document.getElementById("doc")

// we put our commands here
// event listener that takes sets our html elements to current file when file is opened
ipcRenderer.on("fileOpened", (event, { contents, filePath }) => {
    openFilePath = filePath;
    doc.value = contents;
    // set our styles using javascript
    doc.style.display = "inline-block";
    document.getElementById("file-path") = filePath;
});

ipcRenderer.on("saveFile", (event) => {
    const currentValue = doc.value;
    fs.writeFileSync(openFilePath, currentValue, "utf-8");
});