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

// Console.info event listener
const origConsoleInfo = console.info;
console.info = (...args) => {
    origConsoleInfo.apply(console, args);
    if (args[0].includes("Loaded icon pack 'remix-icons'")) {
        reload();
    }
};


// Reload Tabs (only if reading view & broken icons detected)
const reload = async () => {
    const leaves = this.app.workspace.getLeavesOfType('markdown');
    for (const leaf of leaves) {
        if (leaf.view?.getMode && leaf.view.getMode() === "preview" && /:[A-Za-z]*:/
            .test(leaf.containerEl.innerHTML)) {
            const file = leaf.view.file;
            await leaf.setViewState({ type: 'empty' });
            await leaf.setViewState({ type: 'markdown', state: { file: file.path } });
            console.log(`Reloaded tab: ${file.basename}`);
        }
    }
};
_%>