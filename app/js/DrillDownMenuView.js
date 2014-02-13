var DrillDownMenuView = Backbone.View.extend({
	className: 'drilldown drilldown-hide',

	template: _.template('<button class="drilldown-menu-return btn btn-default"><span class="glyphicon glyphicon-backward"></span></button><button class="drilldown-menu-close btn btn-default"><span class="glyphicon glyphicon-remove"></span></button><ul class="drilldown-menu" />'),

	events: {
		'click .drilldown-menu-return': 'return',
		'click .drilldown-menu-close': 'close',
	},

	defaults: _.extend({}, {
		headerHeight: 32,
		itemViewHeight: 41,
		events: {}
	}, DrillDownMenu.DEFAULTS),

	initialize: function(attr) {
		this.itemViews = [];
		this.items = attr.items;
		this.iconMappings = attr.iconMappings || this.defaults.iconMappings;
		this.customizedEvents = attr.customizedEvents || this.defaults.events;

		this.listenTo(this.items, 'add', this.addOne);
		this.listenTo(this.items, 'reset', this.render);
		this.listenTo(this.items, 'open', this.delayedResize);
	},

	render: function() {
		this.$el.html(this.template());

		if(this.items.collection !== undefined) {
			this.items.collection.forEach(function(item) {
				this.createAndAppendItemView(item);
			}, this);
		}

		return this;
	},

	addOne: function(item) {
		this.createAndAppendItemView(item);
		this.resize(this.items);
	},

	createAndAppendItemView: function(item) {
		var itemView = new DrillDownMenuItemView({ 
			model: item,
			iconMappings: this.iconMappings,
			customizedEvents: this.customizedEvents
		});
		this.itemViews.push(itemView);
		this.getList().append(itemView.render().el);
	},

	getList: function() {
		return this.$('> ul');
	},

	getItemView: function(index) {
		return this.itemViews[index];
	},

	getReturnBtn: function() {
		return this.$('.drilldown-menu-return');
	},

	getCloseBtn: function() {
		return this.$('.drilldown-menu-close');
	},	

	return: function() {
		this.$('.drilldown-menu-hide').removeClass('drilldown-menu-hide');
		this.resize(this.items);
	},

	close: function() {
		this.$el.addClass('drilldown-hide');
	},

	open: function() {
		this.$el.removeClass('drilldown-hide');	
	},

	resize: function(item) {
		var listHeight = item.collection ? item.collection.length : 0;

		this.$el.height(this.defaults.headerHeight 
				+ listHeight
				* this.defaults.itemViewHeight);
	},

	delayedResize: function(item) {
		var _this = this;
		setTimeout(function() { _this.resize(item) }, 500);
	},
});