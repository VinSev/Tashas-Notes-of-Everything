/**
 * Converts a string to camelCase format.
 * 
 * @param {string} str - The input string.
 * 
 * @returns {string} The camelCase version of the string.
 */
function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_])/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/[\s-_]+/g, '');
}

module.exports = toCamelCase;
