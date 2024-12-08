<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Return icon based on type
function getIcon(type) {
	const iconMappings = {
		Personal: ':FasCalendarDays:',
		Political: ':FasBullhorn:',
		Religious: ':FasCross:',
		Seasonal: ':RiSunFoggyFill:',
	};
	
	return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('EVENT');
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);
const tags = type ? `event/${tp.user.toCamelCase(type)}` : '';

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New event <span style="text-decoration: underline;">${name}</span> added`;
} else {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Event has not been added`;
    return;
}
_%>

---
type: event
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2"><% type ? `${icon} ${type} Event` : '' %></span>
___

> [!quote|no-t]
> ![[embed.jpg|right wm-sm]]Description of the <% type ? type.toLowerCase() + ' event' : 'event' %>, <% name %>.
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