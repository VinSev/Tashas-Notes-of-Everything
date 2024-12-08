<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('DEITY');
const alignment = result.Alignment.value;
const name = result.Name.value;
const gender = result.Gender.value;
const domains = result.Domains.value;
const pantheon = result.Pantheon.value;
const rank = result.Rank.value;
const tags = domains ? domains.map(value => `- domain/${tp.user.toCamelCase(value)}`).join("\n") : '';

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New deity <span style="text-decoration: underline;">${name}</span> added`;
} else {
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Deity has not been added`;
    return;
}
_%>

---
type: deity
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2">:FasCross: Deity <% alignment ? `&nbsp; | &nbsp; :FasYinYang: ${alignment}` : '' %></span>
___

> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Divine Rank | <% rank ? rank : '' %> |
> | :FasBuildingColumns: Pantheon | <% pantheon ? pantheon : '' %> |
> | :FasBoltLightning: Domains | <% domains ? domains.join(', ') : '' %> |
> | :FasVenusMars: Gender | <% gender ? gender : '' %> |

> [!quote|no-t]
> Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : '' %> <% rank ? rank.toLowerCase() : '' %>.


> [!column|flex 3]
>> [!hint]-  NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[<% name %>]] 
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]