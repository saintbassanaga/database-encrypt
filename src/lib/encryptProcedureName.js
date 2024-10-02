const splitWords = require("./splitWords");

module.exports = function encryptProcedureName(fullProcedureName, procedureSequence, options = {}) {

    let procedureName = fullProcedureName;

    const prefixEncryptedNames = {
        'ps_App_': 'xx_116_',
        'ps_App': 'xx_116_',
        'ps_Base_': 'xx_211_',
        'ps_Base': 'xx_211_',
        'ps_Elab_': 'xx_512_',
        'ps_Elab': 'xx_512_',
        'ps_Exec_': 'xx_524_',
        'ps_Exec': 'xx_524_',
        'ps_Suivi_': 'xx_192_',
        'ps_Suivi': 'xx_192_',
        'dt_': 'xx_433_',
        'dt': 'xx_433_',
        'ps_Bi_': 'xx_785_',
        'ps_Bi': 'xx_785_',
        'ps_cos_': 'xx_312_',
        'ps_cos': 'xx_312_',
        'ps_dsce_': 'xx_841_',
        'ps_dsce': 'xx_841_',
        'ps_Prepa_': 'xx_111_',
        'ps_Prepa': 'xx_111_',
        'ps_Prebud_': 'xx_666_',
        'ps_Prebud': 'xx_666_',
        'ps_ficheProjet_': 'xx_555_',
        'ps_ficheProjet': 'xx_555_',
        'ps_PSFE_': 'xx_938_',
        'ps_PSFE': 'xx_938_',
        'ps_RptSuivi_': 'xx_222_',
        'ps_RptSuivi': 'xx_222_',
        'ps_strategie_': 'xx_642_',
        'ps_strategie': 'xx_642_',
        'ps_tbl_': 'xx_456_',
        'ps_tbl': 'xx_456_'
    };

    const prefixEncryptedNamesDefault = {
        'ps_': 'xx_237_',
        'ps': 'xx_237_',
    }

    let procedureEncryptedPrefix = '';

    // Trim prefix before encryption
    for (const [prefix, encryptedPrefix] of Object.entries(prefixEncryptedNames)) {
        if (procedureName.toLowerCase().startsWith(prefix.toLowerCase())) {
            procedureName = procedureName.slice(prefix.length);
            procedureEncryptedPrefix = encryptedPrefix;
            break;
        }
    }

    if (!procedureEncryptedPrefix) {
        for (const [prefix, encryptedPrefix] of Object.entries(prefixEncryptedNamesDefault)) {
            if (procedureName.toLowerCase().startsWith(prefix.toLowerCase())) {
                procedureName = procedureName.slice(prefix.length);
                procedureEncryptedPrefix = encryptedPrefix;
                break;
            }
        }
    }

    if (!procedureEncryptedPrefix) {
        console.info(`No standard prefix found for name ${fullProcedureName}`);
    }

    // Transformation
    let words = splitWords(procedureName);

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

    let correspondance = `${procedureEncryptedPrefix}${procedureName.charAt(0)}${procedureSequence.substring(0, 2)}${abbreviation}${procedureSequence.substring(2)}${procedureName.charAt(procedureName.length - 1)}`.toLowerCase();

    if (correspondance.length !== 10 && /[A-Z]/g.test(correspondance)) {
        throw new Error('Wrong encrypted output. Check your source algorithm');
    }

    if (options.fullOutput) {
        return { procedureName, procedureSequence, abbreviation, correspondance };
    }

    return correspondance;

}