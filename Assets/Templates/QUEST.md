<%*
// ###########################################################
//                       Helper Functions
// ###########################################################

function formatSub(status, npc) {
	return [
		:FasCircleExclamation: Quest`,
		status && `:FasListCheck: ${status}`,
		npc && `:FasUser: [[${npc}#${npc}]]`
	]
	.filter(sub => sub)
	.join('&nbsp;&nbsp;|&nbsp;&nbsp;');
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('QUEST');
const name = result.Name.value;
const status = result.Status.value;
const location = result.Location.value;
const npc = result.Assignor.value;
const target = result.Assignee.value;
const tags = status ? `quest/${status.toLowerCase()}` : '';
const sub = formatSub(status, npc);

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Quest', name)
} else {
    tp.user.showNotice(false, 'Quest', name)
    return
}
_%>

---
type: quest
target: <% target === "[ Group Quest ]" ? 'groupQuest' : target ? `"[[${target}]]"` : '' %>
locations:
- <% location ? `"[[${location}]]"` : '' %>
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---
###### <% name %>
<span class="sub2"><% sub ? sub : '' %></span>
___

> [!infobox|no-t right]
> ![[quest.png]]
> ###### Rewards:
> | Type | Amount |
> | ---- | ---- |
> | <span class="coppercoin">:RiCoinsFill:</span> | 0 |
> | <span class="silvercoin">:RiCoinsFill:</span> | 0 |
> | <span class="goldcoin">:RiCoinsFill:</span> | 0 |
> | <span class="platinumcoin">:RiCoinsFill:</span> | 0 |

> [!quote|no-t]
> Quest description here... (Objective, Deadline, Clues)


> [!column|flex 3]
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]

