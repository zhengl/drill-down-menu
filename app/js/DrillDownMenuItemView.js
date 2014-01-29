var DrillDownMenuItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template('<a><%= title %></a>'),

	events: {
		'click a': 'onClick',
	},

	initialize: function() {
		this.listenTo(this.model, 'add', this.addItem);
		this.listenTo(this.model, 'change:isOpen', this.open);
	},

	render: function() {
		this.$el.html(this.template({ title: this.model.attributes.title }));
		
		if(this.hasMenuItems()) {
			this.$list = $('<ul></ul>');
			this.$list.addClass('drilldown-menu');
			this.$el.append(this.$list);
		}
		
		return this;
	},

	addItem: function(item) {
		if(this.$list) {
			this.$list.append(new DrillDownMenuItemView({ model: item }).render().el);
		}
	},

	onClick: function(event) {
		if(this.hasMenuItems()) {
			event.stopPropagation();
			this.model.set('isOpen', true);
		}
	},

	open: function() {
		this.$el.parent().addClass('drilldown-menu-hide');
	},

	hasMenuItems: function() {
		return this.model instanceof DrillDownMenuItems;
	}
});