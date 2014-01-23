var DrillDownMenuItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template('<a><%= title %></a>'),

	events: {
		'click a': 'open',
	},

	initialize: function() {
		this.listenTo(this.model, 'add', this.addItem)
	},

	render: function() {
		this.$el.html(this.template({ title: this.model.attributes.title }));
		
		if(this.model instanceof DrillDownMenuItems) {
			this.$list = $('<ul></ul>');
			this.$list.addClass('dropdown-menu');
			this.$el.append(this.$list);
		}
		return this;
	},

	addItem: function(item) {
		if(this.$list) {
			this.$list.append(new DrillDownMenuItemView({ model: item }).render().el);
		}
	},

	open: function(event) {
		if(this.model instanceof DrillDownMenuItems) {
			event.stopPropagation();
			this.$el.parent().addClass('dropdown-menu-hide');
		}
	},
});