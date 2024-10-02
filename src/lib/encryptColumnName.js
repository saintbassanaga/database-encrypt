const splitWords = require("./splitWords");

module.exports = function encryptColumnName(columnName, columnSequence, options = {}) {

    const ignoreWords = ['ar', 'aut', 'ch', 'ex', 'od', 'param', 'or', 'pa', 'pc', 'pg', 'ne', 'gr', 'in', 'um', 'at', 'tm', 'bn', 'pf', 'li', 'ru', 'ag', 'ca']

    // Transformation
    let words = splitWords(columnName);

    // Ignore words
    for (const ignoreWord of ignoreWords) {
        const ignoreWords = splitWords(ignoreWord);
        if (columnName.startsWith(ignoreWord) && ignoreWords.every(word => words.includes(word))) {
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

    abbreviation = abbreviation.toLowerCase();

    if (abbreviation.length < 4) {
        abbreviation = `${abbreviation}${abbreviation}${abbreviation}${abbreviation}`.substring(0, 4);
    }

    // Build final code

    let correspondance = `${columnName.charAt(0)}${columnSequence.substring(0, 2)}${abbreviation}${columnSequence.substring(2)}${columnName.charAt(columnName.length - 1)}`.toLowerCase();

    if (correspondance.length !== 10 && /[A-Z]/g.test(correspondance)) {
        throw new Error('Wrong encrypted output. Check your source algorithm');
    }

    if (options.fullOutput) {
        return { columnName, columnSequence, abbreviation, correspondance };
    }

    return correspondance;

}