const splitWords = require("./splitWords");

module.exports = function encryptTableName(tableName, tableSequence, options = {}) {

    const ignoreWords = ['exec', 'Exec', 'tbl', 'TBL', 'Prepa', 'probmis', 'RG22', 'RG', 'Elab', 'elab', 'Dsce', 'cos', 'Base']

    // Transformation
    let words = splitWords(tableName);

    // Ignore words
    for (const ignoreWord of ignoreWords) {
        const ignoreWords = splitWords(ignoreWord);
        if (tableName.startsWith(ignoreWord) && ignoreWords.every(word => words.includes(word))) {
            words = words.slice(ignoreWords.length);
            break;
        }
    }

    let abbreviation = '';

    if (words.length === 1) {
        abbreviation = words[0].substring(0, 4);
    }

    if (words.length === 2) {
        abbreviation = `${words[0].substring(0, 2)}${words[1].substring(0, 2)}`;;
    }

    if (words.length === 3) {
        abbreviation = `${words[0].charAt(0)}${words[1].charAt(0)}${words[2].substring(0, 2)}`;;
    }

    if (words.length >= 4) {
        abbreviation = `${words[0].charAt(0)}${words[1].charAt(0)}${words[2].charAt(0)}${words[3].charAt(0)}`;;
    }

    abbreviation = abbreviation.toUpperCase();

    if (abbreviation.length < 4) {
        abbreviation = `${abbreviation}${abbreviation}${abbreviation}${abbreviation}`.substring(0, 5);
    }

    // Build final code

    let correspondance = `${tableName.charAt(0)}${tableSequence.substring(0, 2)}${abbreviation}${tableSequence.substring(2)}${tableName.charAt(tableName.length - 1)}`.toUpperCase();

    if (correspondance.length !== 10 && /[a-z]/g.test(correspondance)) {
        throw new Error('Wrong encrypted output. Check your source algorithm');
    }

    if (options.fullOutput) {
        return { tableName, tableSequence, abbreviation, correspondance };
    }

    return correspondance;

}