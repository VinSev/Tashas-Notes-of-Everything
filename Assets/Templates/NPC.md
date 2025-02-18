<%*
// ###########################################################
//                       Helper Functions
// ###########################################################

function formatTags(affinity, job, race) {
  return [
    affinity && ` - affinity/${tp.user.toCamelCase(affinity)}`,
    job && ` - job/${tp.user.toCamelCase(job)}`,
    race && ` - race/${tp.user.toCamelCase(race)}`
  ]
  .filter(tag => tag)
  .join('\n');
}

function formatSub(location, affinity) {
  return [
    location && `:FasMapLocationDot: [[${location}#${location}]]`,
    affinity && `:FasHeartPulse: ${affinity}`
  ]
  .filter(sub => sub)
  .join('&nbsp;&nbsp;|&nbsp;&nbsp;');
}

// ###########################################################
//                         Main Code
// ###########################################################

const result = await MF.openForm('NPC');
const affinity = result.Affinity.value;
const gender = result.Gender.value;
const job = result.Job.value;
const location = result.Location.value;
const name = result.Name.value;
const race = result.Race.value;
const sub = formatSub(location, affinity);
const tags = formatTags(affinity, job, race);

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'NPC', name)
} else {
    tp.user.showNotice(false, 'NPC', name)
    return
}
_%>

---
type: npc
locations:
- <% location ? `"[[${location}]]"` : '' %>
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---
###### <% name %>
<span class="sub2"><% sub ? sub : '' %> </span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasUser: Race | <% race ? race : '' %> |
> | :FasVenusMars: Gender | <% gender ? gender : '' %> |
> | :FasBriefcase: Job |  <% job ? job : '' %> |
<span class="clearfix"></span>

> [!quote|no-t]
> Profile of <% name %>, the <% `${gender ? gender.toLowerCase() : ''}${race ? (gender ? ' ' : '') + race : ''}` %> NPC.


> [!column|flex 3]
>>[!tldr]- RELATIONSHIPS
>> - [[Characters]] (status)
>
>> [!important]- QUESTS
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/Party/Quests" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]
