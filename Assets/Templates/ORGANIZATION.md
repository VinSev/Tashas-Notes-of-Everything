<%*
// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('ORGANIZATION');
const alignment = result.Alignment.value;
const name = result.Name.value;
const location = result.Location.value;

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Organization', name)
} else {
    tp.user.showNotice(false, 'Organization', name)
    return
}
_%>

---
type: organization
locations:
- <% location ? `"[[${location}]]"` : '' %>
tags:
 - 
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2">:FasSitemap: Organization</span>
___

> [!quote|no-t]
> ![[embed.jpg|right wm-sm]]Profile of <% name %>, the <% alignment ? alignment.toLowerCase() : 'unknown' %> aligned organization.


> [!column|flex 3]
>>[!example]- MEMBERS
>> - [[Characters]] (position)
>
>>[!tldr]- RELATIONSHIPS
>> - [[Characters]] (status)
>
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[<% name %>]]
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]