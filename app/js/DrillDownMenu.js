var DrillDownMenu = function(json) {
	this.items = new DrillDownMenuItems();
	this.view = new DrillDownMenuView({ items: this.items }).render();

	this.initialize(json);
}

DrillDownMenu.prototype.initialize = function(json) {
	var _this = this;
	json.forEach(function(item) {
		_this.addMenuItem(_this.items, item);
	});
};

DrillDownMenu.prototype.getView = function() {
	return this.view;
};

DrillDownMenu.prototype.setItems = function(json) {
	this.items.reset();
	this.initialize(json);
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