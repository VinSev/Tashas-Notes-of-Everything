/**
 * Formats a given value or array of values as tags.
 * 
 * @param {string | string[]} value - A single tag (string) or an array of tags (strings) to be formatted.
 * 
 * @returns {string} - A formatted string where each tag is prefixed with "- ", with tags in camelCase or without '#' prefix.
 */
function formatTags(tp, value) {
    if (!value) {
        return '';
    }

    if (Array.isArray(value)) {
        return value.map(tag => tag.startsWith('#') ? `- ${tag.slice(1)}` : `- ${tp.user.toCamelCase(tag)}`).join("\n");
    }

    return value.startsWith('#') ? `- ${value.slice(1)}` : `- ${tp.user.toCamelCase(value)}`;
}

module.exports = formatTags