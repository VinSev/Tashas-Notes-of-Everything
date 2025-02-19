<%*
// ###########################################################
//                       Helper Functions
// ###########################################################

function formatSub(alignment) {
    return [
        `:FasCross: Deity`,
        alignment && `:FasYinYang: ${alignment}`
    ]
    .filter(sub => sub)
    .join('&nbsp;&nbsp;|&nbsp;&nbsp;');
}

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
const sub = formatSub(alignment);

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Deity', name)
} else {
    tp.user.showNotice(false, 'Deity', name)
    return;
}
_%>

---
type: deity
tags:
<% tags ? tags : ' - ' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2"><% sub ? sub : '' %></span>
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
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[<% name %>]] 
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]