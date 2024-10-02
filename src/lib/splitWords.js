module.exports = function splitWords(sentence) {

    let resultString = sentence;

    // Camelcase
    resultString = resultString.replace(/([a-z])([A-Z])/g, '$1 $2')
    resultString = resultString.replace(/([A-Z])([A-Z])([a-z])/g, '$1 $2$3')

    // Snake case
    resultString = resultString.split(/_+/).join(' ');

    // Number
    resultString = resultString.replace(/(\D)(\d)/g, '$1 $2')
    resultString = resultString.replace(/(\d)(\D)/g, '$1 $2')

    // abbreviation
    const words = resultString.trim().split(/\s+/);

    return words;
}