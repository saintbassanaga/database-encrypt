const { encryptTableName, parseCsv, toJsonFile, toCsvFile, encryptColumnName, encryptProcedureName } = require('./lib');

// Encryption
const data = parseCsv(
    'probmisMinfiWebExecColumnsPS.csv',
    {
        reducerFn: (object) => {
            // // At this point I'm just trying to check wether or not the actual name
            // // is already in the right format
            //     if (/([a-z]|\d)\d{2}([a-z]|\d){4}\d{2}([a-z]|\d)/g.test(object.columnName)) return { ...object, abbreviation: '', correspondance: object.columnName };
            const { abbreviation, correspondance } = encryptProcedureName(object.procedureName, object.procedureSequence, { fullOutput: true })
            return { ...object, abbreviation, correspondance };
        }
    }
);

// Convert to CSV
toCsvFile('probmisMinfiWebExecColumnsPS_output.csv', data)

// const { parseCsv, toJsonFile, toCsvFile } = require('./lib');
// const data = parseCsv('probmisCasColumns.csv', { reducerFn: o => ({ reference: o.columnName }) });
// toCsvFile('probmisCasColumns2.csv', data);
// const result = {};
// let lastTableName;
// data.forEach(({ tableName, columnName, reference }) => {
//     if (tableName) {
//         lastTableName = tableName;
//     }
//     if (!result[lastTableName]) {
//         result[tableName] = {};
//     }
//     result[lastTableName][columnName]=reference;
// });
// toJsonFile('encryption_table.json', result);
