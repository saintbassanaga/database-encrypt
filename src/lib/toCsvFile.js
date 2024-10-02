const fs = require('fs');

const defaultOptions = {
    separator: ';'
}

function toCsvFile(outputFile = 'output.csv', data, options = defaultOptions) {

    if (!Array.isArray(data) || !data.length) {
        fs.writeFileSync(outputFile, "");
        return;
    }

    const { separator } = { ...defaultOptions, ...options };

    // Get CSV headers
    // Headers are the keys of the first object element in data array
    const headers = Object.keys(data.at(0)).join(separator);

    // Body
    const body = data.map(element => Object.values(element).join(separator)).join('\r\n')

    // Write to CSV
    const output = `${headers}\r\n${body}`

    fs.writeFileSync(outputFile, output);
}

module.exports = toCsvFile;