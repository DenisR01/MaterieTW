const { off } = require("superagent");

function addTokens(input, tokens) {

    if (typeof input !== 'string')
        throw new Error('Input should be a string');

    if (input.length < 6)
        throw new Error('Input should have at least 6 characters');


    tokens.map(token => {
        for (let key in token)
            if (key !== 'tokenName' || typeof token[key] !== 'string')
                throw new Error('Invalid array format');
    })

    if (!input.includes('...'))
        return input;

    tokens.map(token => input = input.replace('...', '${' + token.tokenName + '}'));

    return input;

}

const app = {
    addTokens: addTokens
}

module.exports = app;