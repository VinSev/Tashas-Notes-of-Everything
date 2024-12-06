<%*
// ###########################################################
//                        Helper Functions
// ###########################################################

// Convert string to camelCase
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_])/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/[\s-_]+/g, '');
}

// Return icon based on type
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

// Return modified path based on location
const dv = app.plugins.plugins.dataview.api;
function getPath(location) {
	const match = dv.pages('"Compendium/Atlas"')
		.where(p => p.type === 'locale' && p.file.name === location)
		.map(obj => obj.file.path.split('/').slice(2, -1).join('/'))
		.find(Boolean);

	return match || '';
}

// ###########################################################
//                        Main Code Section
// ###########################################################

// Call modal form & declare variables
const result = await MF.openForm('LANDMARK');
const location = result.Location.value;
const name = result.Name.value;
let type = result.Type.value;
const icon = getIcon(type);
const path = getPath(location);

if (result.status === 'ok') {

    // Rename file & open in new tab; Fire toast notification
    await tp.file.move(`Compendium/Atlas/${location ? `${path}/` : ''}${name}/${name}`);
    await app.workspace.getLeaf(true).openFile(tp.file.find_tfile(name));
    new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Finished!</span><br>New landmark <span style="text-decoration: underline;">${name}</span> added`;

} else {

    // Fire toast notification & exit templater
    new Notice().noticeEl.innerHTML = `<span style="color: red; font-weight: bold;">Cancelled:</span><br>Landmark has not been added`;
    return;
}
_%>

---
cssClasses: grayTable, wideTable
type: landmark
locations:
 - <% location ? `"[[${location}]]"` : '' %>
tags:
 - <% type ? `location/${toCamelCase(type)}` : '' %>
headerLink: "[[<% name %>#<% name %>]]"
---

![[banner.jpg|banner]]
###### <% name %>
<span class="sub2"><% type ? `${icon} ${type}` : '' %></span>
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
> > [!hint]-  NPC's
> >```dataview
LIST WITHOUT ID headerLink
FROM "Compendium/NPC's" AND [[<% name %>]]
SORT file.name ASC
> 
>> [!note]- HISTORY
>>```dataview
LIST WITHOUT ID headerLink
FROM "Session Notes" AND [[<% name %>]]
SORT file.ctime DESC