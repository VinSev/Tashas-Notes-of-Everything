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
    	City: ':FasCity:',
    	Town: ':RiBuilding4Fill:',
    	Encampment: ':FasTowerObservation:',
    	Village: ':FasTents:',
    	Cave: ':FasMound:',
    	Forest: ':FasTree:',
    	Dessert: ':FasSun:',
    	Mountain: ':FasMountain:',
    	Plains: ':FasWheatAwn:',
    	Swamp: ':FasSmog:',
    	Lake: ':FasWater:'
  	};

  	return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('LOCALE');
const location = result.Location.value;
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);
const path = tp.user.getPath(location, ['territory', 'province']);
const tags = type ? `location/${tp.user.toCamelCase(type)}` : '';
const sub = formatSub(icon, type);

if (result.status === 'ok') {
    await tp.file.move(`Compendium/Atlas/${location ? `${path}/` : ''}${name}/${name}`);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Locale', name)
} else {
    tp.user.showNotice(false, 'Locale', name)
    return
}
_%>

---
type: locale
locations:
- <% location ? `"[[${location}]]"` : '' %>
tags:
<% tags ? tags : ' - ' %>
headerLink: "[[<% name %>#<% name %>]]"
---

![[banner.jpg|banner]]
###### <% name %>
<span class="sub2"><% sub ? sub : '' %></span>
___

> [!quote|no-t] SUMMARY
> Description of the <% type ? type.toLowerCase() : "locale" %> <% name %>.


> [!column|flex 3]
>>[!hint]- NPC's
>><input type="checkbox" id="npc"/><ul class="sortMenu"><li class="sortIcon">:RiListSettingsLine:<ul class="dropdown npcedit"><li><label for="npc" class="directLabel active">Direct Links Only</label></li><li><label for="npc" class="childLabel">Include Sub-Locations</label></li></ul></li></ul>
>>```dataviewjs
>>dv.container.className += ' npcDirect';
>>dv.list(dv.pages('"Compendium/NPC\'s"')
>>.where(p => p.file.outlinks.includes(dv.current().file.link))
>>.sort(p => p.file.link)
>>.map(p => p.headerLink), 1);
>
>>```dataviewjs
>>dv.container.className += ' npcChild';
>>const page = dv.current().file.path;
>>const pages = new Set();
>>const stack = [page];
>>while (stack.length > 0) {
>>const elem = stack.pop();
>>const meta = dv.page(elem);
>>if (!meta) continue;
>>for (const inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) {
>>const locations = dv.page(inlink.path);
>>if (!locations || pages.has(inlink.path) || inlink.path === meta.locations?.[0]) continue;
>>if (dv.array(locations.locations).join(", ").includes(meta.file.path)) {
>>pages.add(inlink.path);
>>stack.push(inlink.path);
>>}}}
>>const data = Array.from(pages)
>>.filter(p => dv.page(p)?.type === "npc")
>>.map(p => dv.page(p).headerLink)
>>.sort((a, b) => {
>>if (a < b) return -1;
>>if (a > b) return 1;
>>return 0;
>>});
>>dv.list(data);
> 
>>[!example]- LOCATIONS
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/Atlas/<% location ? `${path}/` : '' %><% name %>"
>>WHERE type="landmark"
>>SORT file.name ASC
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]
>>SORT file.ctime DESC