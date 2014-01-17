var DrillDownMenuView = Backbone.View.extend({
	template: _.template('<input>'),

	events: {
		'click :text': 'showMenu',
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	showMenu: function() {
		console.log('show');
	},
});