var DrillDownMenuView = Backbone.View.extend({
	tagName: 'ul',

	className: 'dropdown-menu',

	initialize: function(attr) {
		this.itemViews = [];
		this.listenTo(attr.items, 'add', this.addOne);
	},

	render: function() {
		return this;
	},

	addOne: function(item) {
		var itemView = new DrillDownMenuItemView({ model: item });
		this.itemViews.push(itemView);
		this.$el.append(itemView.render().el);
	},

	getItemView: function(index) {
		return this.itemViews[index];
	},

	show: function() {
		
	},
});