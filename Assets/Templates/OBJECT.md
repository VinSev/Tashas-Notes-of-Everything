<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

function getIcon(type) {
    const iconMappings = {
	Armor: ':FasVest:',
	Jewelry: ':FasGem:',
	Weapon: ':RiSwordFill:',
        'Magic Item': ':FasWandMagicSparkles:',
        'Religious Artifact': ':FasCross:',
        'Quest Item': ':FasScroll:',
        Treasure: ':FasGem:'
    };

    return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('OBJECT');
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);
const tags = type ? "object/" + tp.user.toCamelCase(type) : '';

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New object <span style="text-decoration: underline;">${name}</span> added`;
} else {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Object has not been added`;
    return;
}
_%>

---
type: object
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2"><% type ? `${icon} ${type}` : '' %></span>
___

> [!quote|no-t]
> ![[embed.jpg|right wm-sm]]Description of the  <% type ? type.toLowerCase() : 'object' %>, <% name %>.
<span class="clearfix"></span>


> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>FROM "Compendium/NPC's" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>LIST WITHOUT ID headerLink
>FROM "Session Notes" AND [[<% name %>]]