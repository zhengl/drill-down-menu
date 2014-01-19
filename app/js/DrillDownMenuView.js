var DrillDownMenuView = Backbone.View.extend({
	tagName: 'ul',

	initialize: function(attr) {
		this.listenTo(attr.items, 'add', this.addOne);
	},

	render: function() {
		return this;
	},

	addOne: function(item) {
		var itemView = new DrillDownMenuItemView({
			model: item,
		});
		this.$el.append(itemView.render().el);
	},

	show: function() {
		
	},
});