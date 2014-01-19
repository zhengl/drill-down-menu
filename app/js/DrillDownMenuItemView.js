var DrillDownMenuItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template('<a><%= title %></a>'),

	initialize: function() {
		this.listenTo(this.model, 'add', this.addItem)
	},

	render: function() {
		this.$el.html(this.template({ title: this.model.attributes.title }));
		
		if(this.model instanceof DrillDownMenuItems) {
			this.$list = $('<ul></ul>')
			this.$el.append(this.$list);
		}
		return this;
	},

	addItem: function(item) {
		if(this.$list) {
			this.$list.append(new DrillDownMenuItemView({ model: item }).render().el);
		}
	},
});