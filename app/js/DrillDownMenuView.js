var DrillDownMenuView = Backbone.View.extend({
	className: 'drilldown',

	template: _.template('<button class="drilldown-menu-return btn btn-default"><span class="glyphicon glyphicon-backward"></span></button><button class="drilldown-menu-close btn btn-default"><span class="glyphicon glyphicon-remove"></span></button><ul class="drilldown-menu" />'),

	events: {
		'click .drilldown-menu-return': 'return',
		'click .drilldown-menu-close': 'close',
	},

	initialize: function(attr) {
		this.itemViews = [];
		this.listenTo(attr.items, 'add', this.addOne);
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	addOne: function(item) {
		var itemView = new DrillDownMenuItemView({ model: item });
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
	},

	close: function() {
		this.$el.addClass('drilldown-hide');
	},
});