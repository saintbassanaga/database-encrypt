const fs = require('fs');

const defaultParseOptions = {
    separator: ';',
    reducerFn: object => object
}

function parseCsv(filename, options = defaultParseOptions) {

    const { separator, reducerFn } = { ...defaultParseOptions, ...options };

    const csv = fs.readFileSync(filename);
    const lines = csv.toString().split('\r\n').filter(line => line !== '');
    
    const keys = lines[0].split(separator);
    const body = lines.slice(1);
    
    const result = [];

    body.forEach((line) => {
        const object = {};
        const segments = line.split(separator);
        keys.forEach((key, keyIndex) => {
            object[key] = segments[keyIndex]; 
        })
    
        result.push(reducerFn ? reducerFn(object) : object);
    });

    return result;
}

module.exports = parseCsv;