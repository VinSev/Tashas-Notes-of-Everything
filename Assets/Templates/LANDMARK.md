<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

function formatSub(icon, type) {
	return [
		type && `${icon} ${type}`
	]
  	.filter(sub => sub)
  	.join('&nbsp;&nbsp;|&nbsp;&nbsp;');
}

function getIcon(type) {
	const iconMappings = {
		Academy: ':FasSchool:',
		Alchemist: ':FasLeaf:',
		Apothecary: ':FasFlaskVial:',
		Arena: ':RiSwordFill:',
		Armory: ':FasHammer:',
		Bank: ':RiBankFill:',
		Barracks: ':LiCastle:',
		Bathhouse: ':FasBath:',
		Bazaar: ':FasCartShopping:',
		Blacksmith: ':FasHammer:',
		Bookstore: ':FasBook:',
		Brothel: ':FasVenusMars:',
		Butcher: ':bone',
		Camp: ':FasCampground:',
		Carpenter: ':FasHammer:',
		Cartographer: ':FasMap:',
		Castle: ':LiCastle:',
		Cemetery: ':FasGhost:',
		Chapel: ':FasChurch:',
		Church: ':FasChurch:',
		Cobbler: ':FasShoePrints:',
		Coliseum: ':RiSwordFill:',
		Cooperage: ':FasBucket:',
		Courier: ':RiMailFill:',
		Court: ':FasHammer:',
		Dockhouse: ':FasSailboat:',
		Dyer: ':FasShirt:',
		Embassy: ':FasSchoolFlag:',
		Exorcist: ':FasGhost:',
		Fletcher: ':RiFlowerFill:',
		Gallow: ':RiCriminalFill:',
		Garden: ':RiFlowerFill:',
		Garrison: ':RiSwordFill:',
		Gatehouse: ':FasHouseLock:',
		Guildhall: ':FasShield:',
		Herbalist: ':FasLeaf:',
		Hospital: ':FasHospital:',
		Inn: ':FasBed:',
		Jail: ':RiCriminalFill:',
		Jeweler: ':FasGem:',
		Library: ':FasBookOpen:',
		Locksmith: ':FasLock:',
		Market: ':FasScaleUnbalanced:',
		Monastery: ':FasChurch:',
		Morgue: ':FasSkull:',
		Orphanage: ':FasChild:',
		Plaza: ':FasHandshakeSimple:',
		Port: ':FasSailboat:',
		Potter: ':FasHammer:',
		Brewery: ':RiDrinksFill:',
		Residence: ':FasHouse:',
		Shrine: ':FasChurch:',
		Stable: ':FasHorseHead:',
		Store: ':FasCartShopping:',
		Stonemason: ':FasHammer:',
		Tailor: ':FasShirt:',
		Tavern: ':RiBeerFill:',
		Temple: ':FasChurch:',
		Theater: ':FasMasksTheater:',
		Tower: ':FasTowerObservation:',
		Warehouse: ':FasWarehouse:',
		Well: ':FasBucket:'
	};

	return iconMappings[type] || ':FasCircleQuestion:';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

const result = await MF.openForm('LANDMARK');
const location = result.Location.value;
const name = result.Name.value;
const type = result.Type.value;
const icon = getIcon(type);
const path = tp.user.getPath(location, ['locale']);
const tags = type ? `location/${tp.user.toCamelCase(type)}` : '';
const sub = formatSub(icon, type);

if (result.status === 'ok') {
    await tp.file.move(`Compendium/Atlas/${location ? `${path}/` : ''}${name}/${name}`);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    tp.user.showNotice(true, 'Landmark', name)
} else {
    tp.user.showNotice(false, 'Landmark', name)
    return
}
_%>

---
cssClasses: wideTable
type: landmark
locations:
- <% location ? `"[[${location}]]"` : '' %>
tags:
<% tags ? tags : ' - ' %>
headerLink: "[[<% name %>#<% name %>]]"
---

![[banner.jpg|banner]]
###### <% name %>
<span class="sub2"><% sub ? sub : '' %></span>
___

> [!quote|no-t] SUMMARY
> Description of the <% type ? type.toLowerCase() : 'landmark' %> <% name %>.

#### marker
| INVENTORY                  | PRICE |
| -------------------------- | ----- |
| Item 1 | 5 <span class="platinumcoin">:RiCoinsFill:</span>  |
| Item 2 | 80 <span class="goldcoin">:RiCoinsFill:</span>  |
| Item 3 | 20 <span class="silvercoin">:RiCoinsFill:</span>   |
| Item 4 | 100 <span class="coppercoin">:RiCoinsFill:</span>  |
<span class="clearfix"></span>


> [!column|flex 3]
>>[!hint]- NPC's
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Compendium/NPC's" AND [[<% name %>]]
>>SORT file.name ASC
> 
>>[!note]- HISTORY
>>```dataview
>>LIST WITHOUT ID headerLink
>>FROM "Session Notes" AND [[<% name %>]]
>>SORT file.ctime DESC