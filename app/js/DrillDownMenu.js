var DrillDownMenu = function(items, options) {
	var opt = _.extend({}, this.DEFAULTS, options)

	this.items = new DrillDownMenuItem();
	this.view = new DrillDownMenuView({ 
		items: this.items,
		iconMappings: opt.iconMappings,
		customizedEvents: opt.events
	}).render();

	this.initialize(items);
}

DrillDownMenu.DEFAULTS = {
	iconMappings: function() { return ''; }
}

DrillDownMenu.prototype.initialize = function(items) {
	if(_.isFunction(items)) {
		this.fetchChildren = items;
		items = this.fetchChildren();
	}

	items.forEach(function(item) {
		this.addMenuItem(this.items, item);
	}, this);
};

DrillDownMenu.prototype.getView = function() {
	return this.view;
};

DrillDownMenu.prototype.setItems = function(json) {
	this.items.reset();
	this.initialize(json);
};

DrillDownMenu.prototype.addMenuItem = function(itemList, item) {
	var menuItem = new DrillDownMenuItem({ 
		title: item.title, 
		type: item.type,
		hasChild: item.hasChild,
		children: item.children,
		fetchChildren: this.fetchChildren,
	});

	itemList.add(menuItem);

	if(item.hasOwnProperty('children') && item.children) {
		item.children.forEach(function(item) {
			this.addMenuItem(menuItem, item)
		}, this);
	}
};