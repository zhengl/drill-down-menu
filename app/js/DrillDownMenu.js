var DrillDownMenu = function(json) {
	var topList = new DrillDownMenuItems();
	this.view = new DrillDownMenuView({ items: topList }).render();

	var _this = this;
	json.forEach(function(item) {
		_this.addMenuItem(topList, item)
	});
}

DrillDownMenu.prototype.getView = function() {
	return this.view;
};

DrillDownMenu.prototype.addMenuItem = function(itemList, json) {
	if(json.hasOwnProperty('children')) {
		this.addMenuItems(itemList, json);
	} else {
		itemList.add(new DrillDownMenuItem({ title: json.title }));
	}
};

DrillDownMenu.prototype.addMenuItems = function(itemList, json) {
	var menuItems = new DrillDownMenuItems({ title: json.title });
	itemList.add(menuItems);

	var _this = this;
	json.children.forEach(function(item) {
		_this.addMenuItem(menuItems, item)
	});
};