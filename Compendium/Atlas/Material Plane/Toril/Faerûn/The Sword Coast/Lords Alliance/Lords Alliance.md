---
type: province
locations:
  - "[[The Sword Coast]]"
tags:
  - location/coalition
headerLink: "[[Lords Alliance#Lords Alliance]]"
---

![[lordsAlliance.jpg|banner]]
###### Lords Alliance
<span class="sub2">:LiHandshake: Coalition</span>
___

> [!quote|no-t] SUMMARY
>The Lords' Alliance, also known as the Council of Lords, was a partnership of merchant cities founded in the early 14th century DR. Its members were from the [[The Sword Coast]], the North and Western Heartlands, including [[Waterdeep]], Silverymoon, [[Baldurs Gate]], and Neverwinter, as well as other free cities and towns in the region, which made up the bulk of the organization. It was formed to oppose the growing influence of the Black Network in the North, the Shadow Thieves of Amn, rampaging hordes of orcs, and Northlander raiders.

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
FROM "Compendium/Atlas/Material Plane/Toril/Faerûn/The Sword Coast/Lords Alliance"
WHERE type= "locale"
SORT file.name ASC
>
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[Lords' Alliance]]
SORT file.ctime DESC
#### marker