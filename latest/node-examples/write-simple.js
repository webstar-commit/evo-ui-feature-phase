const fs = require('fs');
fs.writeFile('target.txt', 'a witty message for the file', function (err,data) {
    if (err) {
        throw err;
    }
    console.log("File Saved!");
})