---
type: npc
locations:
- "[[Waterdeep]]"
tags:
- race/human
- affinity/hostile
- job/scribe
headerLink: "[[Rythe Sterling#Rythe Sterling]]"
---
###### Rythe Sterling
<span class="sub2">:FasMapLocationDot: [[Waterdeep#Waterdeep|Waterdeep]] &nbsp; | &nbsp; :FasHeartPulse: Hostile</span>
___

> [!infobox|no-t right]
> ![[rythe.webp]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasBriefcase:  Job | Scribe |
> | :FasVenusMars: Gender | Male |
> | :FasUser: Race | Human |
<span class="clearfix"></span>

> [!quote|no-t]
>Rythe, a pale and bald human wizard from Waterdeep, maintains an unassuming presence in the city. Though lacking in overt magical prowess, he quietly navigates the streets, his true allegiance hidden as a member of the [[Black Fingers]]. Behind his unremarkable facade lies a secretive figure, weaving subtle threads of influence within the shadows of Waterdeep's intricate web of intrigue.

#### marker
> [!column|flex 3]
>>[!tldr]- RELATIONSHIPS
>>```dataviewjs
>>const results = dv.pages('"Compendium/NPC\'s" or "Compendium/Party/Player Characters"')
>>    .where(p => p.relationships && p.relationships.some(r => 
>>        r.target.path === "Compendium/NPC's/Rythe Sterling.md" || r.target.path === "Compendium/Party/Player Characters/Rythe Sterling.md"));
>>
>>for (let result of results) {
>>    if (result.file.path !== "Compendium/NPC's/Rythe Sterling.md" || result.file.path !== "Compendium/Party/Player Characters/Rythe Sterling.md") {
>>        let relationships = result.relationships.filter(r => 
>>            r.target.path === "Compendium/NPC's/Rythe Sterling.md" || r.target.path === "Compendium/Party/Player Characters/Rythe Sterling.md");
>>
>>        relationships.forEach(relationship => {
>>            dv.list([`[[${result.file.name}]] (${relationship.type})`]);
>>        });
>>    }
>>}
>
>> [!important]- QUESTS:
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/Party/Quests" AND [[Rythe Sterling]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[Rythe Sterling]]