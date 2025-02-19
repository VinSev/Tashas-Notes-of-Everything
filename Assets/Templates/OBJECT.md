<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

function formatSub(icon, type, is_magical, is_cursed, rarity) {
	return [
		icon && `${icon}`,
        rarity && `${rarity}`,
        is_cursed && `Cursed`,
        is_magical && `Magic`,
        type && `${type}`
	]
  	.filter(sub => sub)
  	.join(' ');
}

function getIcon(type) {
    const iconMappings = {
        Weapon: ':RiSwordFill:',
        Armor: ':FasShield:',
        Clothing: ':FasShirt:',
        Jewelry: ':FasGem:',
        Relic: ':FasBookOpen:',
        'Religious Artifact': ':FasCross:',
        Potion: ':FasPrescriptionBottleMedical:',
        Scroll: ':FasScroll:',
        Poison: ':FasBiohazard:'
    };

    return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('OBJECT');
const name = result.Name.value;
const type = result.Type.value;
const is_magical = result.Magical.value;
const is_cursed = result.Cursed.value;
const rarity = result.Rarity.value;
const icon = getIcon(type);
const tags = type ? "object/" + tp.user.toCamelCase(type) : '';
const sub = formatSub(icon, type, is_magical, is_cursed, rarity);

if (result.status === 'ok') {
    await tp.file.rename(name);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Object', name)
} else {
    tp.user.showNotice(false, 'Object', name)
    return
}
_%>

---
type: object
tags:
<% tags ? tags : ' - ' %>
headerLink: "[[<% name %>#<% name %>]]"
---

###### <% name %>
<span class="sub2"><% sub ? sub : '' %></span>
___

> [!quote|no-t]
> ![[embed.jpg|right wm-sm]]Description of the  <% type ? type.toLowerCase() : 'object' %>, <% name %>.
<span class="clearfix"></span>


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