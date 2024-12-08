---
type: territory
locations:
 - "[[Faerûn]]"
tags:
 - location/generalRegion
headerLink: "[[Western Heartlands#Western Heartlands]]"
---

![[westernHeartlands.jpg|banner]]
###### Western Heartlands
<span class="sub2">:FasMap: General Region</span>
___

> [!quote|no-t] SUMMARY
>The Western Heartlands (originally "Hartlands" for the abundance of deer) is a region located in the western portion of [[Faerûn]]. It stretches from the [[Sword Coast]] region at water's edge of the Sea of Swords in the west, to the Storm Horn Mountains in the east. The region extends north until the Lizard Marsh of the Delimbiyr Vale, including the High Moor to the northeast, and went as far south to the Lands of Intrigue of Amn, Tethyr and Calimshan. 

#### marker
> [!column|flex 3]
> > [!hint]-  NPC's
> > <input type="checkbox" id="npc"/><ul class="sortMenu"><li class="sortIcon">:RiListSettingsLine:<ul class="dropdown npcedit"><li><label for="npc" class="directLabel active">Direct Links Only</label></li><li><label for="npc" class="childLabel">Include Sub-Locations</label></li></ul></li></ul>
> >```dataviewjs
dv.container.className += ' npcDirect';
dv.list(dv.pages('"Compendium/NPC\'s"')
 .where(p => p.file.outlinks.includes(dv.current().file.link))
.sort(p => p.file.link)
.map(p => p.headerLink), 1);
>>```
>>```dataviewjs
dv.container.className += ' npcChild';
let page = dv.current().file.path;
let pages = new Set();
let stack = [page];
while (stack.length > 0) {
let elem = stack.pop();
let meta = dv.page(elem);
if (!meta) continue;
for (let inlink of meta.file.inlinks.concat(meta.file.outlinks).array()) {
let locations = dv.page(inlink.path);
if (!locations || pages.has(inlink.path) || inlink.path === meta.locations?.[0]) continue;
 if (dv.array(locations.locations).join(", ").includes(meta.file.path)) {
 pages.add(inlink.path);
 stack.push(inlink.path);
}}}
let data = Array.from(pages)
.filter(p => dv.page(p)?.type === "npc")
.map(p => dv.page(p).headerLink)
.sort((a, b) => {
if (a < b) return -1;
if (a > b) return 1;
return 0;
});
dv.list(data);
> 
>> [!example]- LOCATIONS
>>```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn"
WHERE type= "province"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Western Heartlands]]
SORT file.ctime DESC
#### marker