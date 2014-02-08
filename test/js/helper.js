function getTitle(el) {
	return $(el).children('a').text();
}

function getIcon(el) {
	return $(el).children('a').children('.icon');
}

function getMenuItemElements(view) {
	return view.getList().children('li');
}

function expectFlatCountryItems(menuItems) {
	expect(menuItems.length).toBe(2);
	expect(getTitle(menuItems[0])).toBe('China');
	expect(getTitle(menuItems[1])).toBe('India');	
}

function expectNestedContinentItems(menuItems) {
	expect(menuItems.length).toBe(2);
	expect(getTitle(menuItems[0])).toBe('Asia');
	expect(getTitle(menuItems[1])).toBe('Europe');
	expect(menuItems[0].children[1].children.length).toBe(2);
	expect(getTitle(menuItems[0].children[1].children[0])).toBe('China');
	expect(getTitle(menuItems[0].children[1].children[1])).toBe('India');	
}