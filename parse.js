const { MessageMentions: { USERS_PATTERN } } = require('discord.js');


function parsingUser(user, msg) {
    const matches = msg
        .match(USERS_PATTERN)
        ?.find(u => u === user.toString());
    if (!matches) {
        return "";
    }

    const content = msg
        .replace(USERS_PATTERN, '')
        .trim();

    return content;
}

function parsingCode(msg) {
    const codes = msg
        .match(/`{3}([\S\s]*?)`{3}|`([\S\s]*)`/g)
        ?.map((code) => {
            return code.replace(/`{3}(.*\n)?|`/, "```").replace(/`*|`*$/g, "");
        });
    

    return codes;
}

exports.parsing = (...args) => parsingCode(parsingUser(...args));