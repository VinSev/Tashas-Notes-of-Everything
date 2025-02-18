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
>> - [[Characters]] (status)
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