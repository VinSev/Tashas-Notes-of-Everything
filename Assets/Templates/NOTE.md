<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

function nextSessionNumber() {
  const sessionRegex = /^Session Notes\/Session (\d+)/;
  const files = this.app.vault.getMarkdownFiles()
    .reduce((maxNumber, file) => Math.max(maxNumber, (file.path.match(sessionRegex) || [])[1] || 0), 0) + 1;
  
  return files < 10 ? '0' + files : files.toString();
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('NOTE');
const date = result.Date.value;
const title = result.Title.value;
const location = result.Location.value ? result.Location.value.map(value => `- "[[${value}]]"`).join("\n") : '';
const number = nextSessionNumber();
const name = `Session ${number} (${date})`;
const tags = tp.user.formatTags(result.Tags.value);


if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Session Note', name)
} else {
    tp.user.showNotice(false, 'Session Note', name)
    return
}
_%>

---
type: notes
locations:
- <% location ? `"[[${location}]]"` : '' %>
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% title %>|<% name %>]]"
---

![[session.png|banner]]
###### <% title %>
<span class="sub2">:FasSun: DAY 00 &nbsp; | &nbsp; :FasTags: `= this.file.tags`</span>
___

> [!quote|no-t] SUMMARY
> Recap of the session's events here.


> [!column|flex 3]
>> [!info|flex] NPC'S
>> - [[Characters]] (status)
>
>> [!example|flex] LOCATIONS
>> - [[Locations]] (status)
>
>> [!important|flex] QUESTS
>> - [[Quests]] (status)
