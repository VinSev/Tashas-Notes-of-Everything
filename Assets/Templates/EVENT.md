<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

function formatSub(icon, type) {
	return [
		type && `{icon} {type} Event`
	]
  	.filter(sub => sub)
  	.join('&nbsp;&nbsp;|&nbsp;&nbsp;');
}

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
const sub = formatSub(icon, type);

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Event', name)
} else {
    tp.user.showNotice(false, 'Event', name)
    return
}
_%>

---
type: event
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2"><% sub ? sub : '' %></span>
___

> [!quote|no-t]
> ![[embed.jpg|right wm-sm]] Description of the <% type ? type.toLowerCase() + ' event' : 'event' %>, <% name %>.
<span class="clearfix"></span>


> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]