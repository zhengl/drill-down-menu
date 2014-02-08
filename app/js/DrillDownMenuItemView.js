var DrillDownMenuItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template('<a><%= icon %><%= title %></a>'),

	events: {
		'click a': 'onClick',
	},

	initialize: function(attr) {
		this.iconMappings = attr.iconMappings;

		this.listenTo(this.model, 'add', this.addItem);
		this.listenTo(this.model, 'open', this.open);
	},

	render: function() {
		this.$el.html(this.template({ 
			title: this.model.attributes.title,
			icon: this.iconMappings(this.model.type)
		}));
		
		return this;
	},

	appendList: function() {
		if(this.hasMenuItems()) {
			this.$list = $('<ul></ul>');
			this.$list.addClass('drilldown-menu');
			this.$el.append(this.$list);
		}
	},

	addItem: function(item) {
		if(this.$list === undefined) this.appendList();
		
		this.$list.append(new DrillDownMenuItemView({
			model: item,
			iconMappings: this.iconMappings
		}).render().el);
	},

	onClick: function(event) {
		if(this.hasMenuItems()) {
			event.stopPropagation();
			this.model.open();
		}
	},

	open: function() {
		this.$el.parent().addClass('drilldown-menu-hide');
	},

	hasMenuItems: function() {
		return this.model.hasChild || this.model.collection !== undefined;
	}
});