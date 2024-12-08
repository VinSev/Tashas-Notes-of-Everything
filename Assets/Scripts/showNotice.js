/**
 * Displays a notification indicating whether an operation was successful or cancelled.
 * 
 * @param {boolean} isFinished - A flag indicating whether the operation was successful (`true`) or cancelled (`false`).
 * @param {string} note - A custom message describing the operation (e.g., "New territory", "New region").
 * @param {string} name - The name of the territory (or item) involved in the operation.
 * 
 * @returns {void} This function does not return anything. It updates the inner HTML of a `Notice` element.
 */
function showNotice(isFinished, note, name) {
    const notice = new Notice();

    if (isFinished) {
        notice.noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br> ${note} <span style="text-decoration: underline;">${name}</span> added`;
    } else {
        notice.noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>${note} has not been added`;
    }
}

module.exports = showNotice;