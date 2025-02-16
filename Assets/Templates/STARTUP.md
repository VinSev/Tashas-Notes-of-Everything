<%*
// ###########################################################
//                  NPC TOGGLE FOR LOCATION VIEW
// ###########################################################

parent.window.addEventListener('change', ({ target }) => {
    if (target.id === 'npc' && target.type === 'checkbox') {
        const [directView, childView] = document.querySelectorAll('.npcDirect, .npcChild');
        const [directLabel, childLabel] = document.querySelectorAll('.directLabel, .childLabel');

        directView.style.display = target.checked ? 'none' : 'block';
        childView.style.display = target.checked ? 'block' : 'none';

        directLabel.classList.toggle('active', !target.checked);
        childLabel.classList.toggle('active', target.checked);
    }
});
console.log('NPC Toggle: event listener attached');

// ###########################################################
//              FIX BROKEN ICON CODES ON STARTUP
// ###########################################################

const iconize = app.plugins.plugins["obsidian-icon-folder"];
if (iconize) {
    const event = iconize.api.getEventEmitter();
    const rerender = () => {
        const leaves = app.workspace
            .getLeavesOfType("markdown")
            .filter(leaf =>
                leaf?.view?.getMode?.() === "preview" &&
                leaf?.view?.containerEl &&
                /:[A-Za-z]+:/.test(leaf.view.containerEl.innerText || "")
            );

        for (const leaf of leaves) {
            leaf.view?.previewMode?.rerender?.(true);
            console.log("Refreshed tab:", leaf.getDisplayText());
        }
    };
    event.on("allIconsLoaded", rerender);
}
_%>