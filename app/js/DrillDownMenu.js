var DrillDownMenu = function(json, options) {
	var opt = _.extend({}, this.DEFAULTS, options)

	this.items = new DrillDownMenuItems();
	this.view = new DrillDownMenuView({ 
		items: this.items,
		iconMappings: opt.iconMappings
	}).render();

	this.initialize(json);
}

DrillDownMenu.DEFAULTS = {
	iconMappings: function() { return ''; }
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
		itemList.add(new DrillDownMenuItem({ 
			title: json.title,
			type: json.type
		}));
	}
};

DrillDownMenu.prototype.addMenuItems = function(itemList, json) {
	var menuItems = new DrillDownMenuItems({ 
		title: json.title, 
		type: json.type
	});
	itemList.add(menuItems);

	var _this = this;
	json.children.forEach(function(item) {
		_this.addMenuItem(menuItems, item)
	});
};