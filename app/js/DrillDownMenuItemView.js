var DrillDownMenuItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template('<a href="<%= href %>"><%= icon %><%= title %></a>'),

	events: {
		'click a': 'onClick',
	},

	initialize: function(attr) {
		this.iconMappings = attr.iconMappings;
		this.customizedEvents = attr.customizedEvents;

		this.listenTo(this.model, 'add', this.addItem);
		this.listenTo(this.model, 'open', this.open);
	},

	render: function() {
		this.$el.html(this.template({ 
			title: this.model.title,
			href: this.model.href,
			icon: this.iconMappings(this.model.type)
		}));
		
		this.delegateCustomizedEvents();

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
			iconMappings: this.iconMappings,
			customizedEvents: this.customizedEvents
		}).render().el);

		this.delegateCustomizedEvents();
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
	},

	delegateCustomizedEvents: function() {
		var eventMatcher = /(\w+)\s+(\w+)?:(\w+)/;
		for(var eventDef in this.customizedEvents) {
			var found = eventDef.match(eventMatcher);
			if(!found) continue;

			var action = found[1];
			var title = found[2];
			var selector = found[3];

			if(title && title != this.model.title) continue;

			switch(selector) {
				case 'child':
					if(!this.hasMenuItems()) {
						this.$el.on(action, this.customizedEvents[eventDef]);
					}
					break;
				case 'parent':
					if(this.hasMenuItems()) {
						this.$el.on(action, this.customizedEvents[eventDef]);
					}
					break;
			}
			
		}
	}
});