/**
 * Returns the modified path based on location and the provided types.
 * 
 * @param {string} location - The name of the location (file name).
 * @param {Array<string>} types - Array of types to filter pages by (e.g., 'realm', 'territory', 'province').
 * 
 * @returns {string} The modified path or an empty string if no match is found.
 */
function getPath(location, types) {
    const dv = app.plugins.plugins.dataview.api;
    const match = dv.pages('"Compendium/Atlas"')
        .where(p => types.includes(p.type) && p.file.name === location)
        .map(obj => obj.file.path.split('/').slice(2, -1).join('/'))
        .find(Boolean);

    return match || '';
}

module.exports = getPath;
