var DrillDownMenuItemView = Backbone.View.extend({
	tagName: 'li',

	render: function() {
		this.$el.html(this.model.attributes.title);
		return this;
	},
});