const fs = require('fs');

function toJsonFile(outputFile = 'output.json', data) {
    const json = JSON.stringify(data);
    fs.writeFileSync(outputFile, json);
}

module.exports = toJsonFile;