<%*
// ###########################################################
//                       Helper Functions
// ###########################################################

function formatTags(pclass, race) {
  return [
    pClass && ` - class/${tp.user.toCamelCase(pClass)}`,
    race && ` - race/${tp.user.toCamelCase(race)}`
  ]
  .filter(tag => tag)
  .join('\n');
}

function getIcon(pClass) {
  const iconMappings = {
    Artificer: ':RiToolsFill: Specialist',
    Barbarian: ':FasCity: Primal Path',
    Bard: ':FasGuitar: College',
    Cleric: ':FasPersonPraying: Divine Domain',
    Druid: ':FasMoon: Circle',
    Fighter: ':FasUserShield: Archetype',
    Monk: ':FasHandFist: Tradition',
    Paladin: ':FasFireFlameCurved: Oath',
    Ranger: ':FasBullseye: Conclave',
    Rogue: ':RiSwordFill: Archetype',
    Sorcerer: ':FasHandSparkles: Origin',
    Warlock: ':FasBurst: Patron',
    Wizard: ':FasWandMagicSparkles: School'
  };

  return iconMappings[pClass] || ':FasCircleQuestion: Sub Class';
}

// ###########################################################
//                         Main Code
// ###########################################################

const result = await MF.openForm('PC');
const quote = result.Quote.value;
const level = result.Level.value;
const pClass = result.pClass.value;
const subClass = result.subClass.value;
const subType = getIcon(pClass);
const name = result.Name.value;
const gender = result.Gender.value;
const race = result.Race.value;
const tags = formatTags(pClass, race);

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Player Character', name)
} else {
    tp.user.showNotice(false, 'Player Character', name)
    return
}
-%>
---
type: pc
relationships: 
- target: "[[]]" 
  type: ""
  
tags:
- <% tags ? tags : '' %>
headerLink: "[[<% name %>#<% name %>]]"
level: "<% level ? level : '' %>"
race: "<% race ? race : '' %>"
class: "<% pClass ? pClass : '' %>"
subClass: "<% subClass ? subClass : '' %>"
cover: "/Assets/Images/Portrait.jpg"
---

###### <% name %>
:FasPerson: Player Character &nbsp; | &nbsp; :FasQuoteLeft: <% quote ? quote : 'Quote or tagline here' %> :FasQuoteRight:
___
> [!infobox|no-t right]
> ![[portrait.jpg]]
> ###### Details:
> | Type | Stat |
> | ---- | ---- |
> | :FasCrown: Level   | `=this.level` |
> | :RiSwordFill: Class |  `=this.class`|
> | <% subType %> |  `=this.subClass`|
> |  :FasUserGroup: Race |  `=this.race`
> | :FasVenusMars: Gender | <% gender ? gender : '' %> |

> [!quote|no-t]
> Character description here

> [!column|flex 3]
>>[!tldr]- RELATIONSHIPS
>>```dataviewjs
>>const results = dv.pages('"Compendium/NPC\'s" or "Compendium/Party/Player Characters"')
>>    .where(p => p.relationships && p.relationships.some(r => 
>>        r.target.path === "Compendium/NPC's/<% name %>.md" || r.target.path === "Compendium/Party/Player Characters/<% name %>.md"));
>>
>>for (let result of results) {
>>    if (result.file.path !== "Compendium/NPC's/<% name %>.md" || result.file.path !== "Compendium/Party/Player Characters/<% name %>.md") {
>>        let relationships = result.relationships.filter(r => 
>>            r.target.path === "Compendium/NPC's/<% name %>.md" || r.target.path === "Compendium/Party/Player Characters/<% name %>.md");
>>
>>        relationships.forEach(relationship => {
>>            dv.list([`[[${result.file.name}]] (${relationship.type})`]);
>>        });
>>    }
>>}
>
>> [!info]- STORYLINES
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/Party/Quests" AND [[<% name %>]]
>>SORT file.ctime DESC
>
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]
>>SORT file.ctime DESC