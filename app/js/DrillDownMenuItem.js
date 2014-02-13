var DrillDownMenuItem = Backbone.Model.extend({
	initialize: function(attr) {
		if(attr) {
			this.title = attr.title;
			this.href = attr.href;
			this.hasChild = attr.hasChild;
			this.fetchChildren = attr.fetchChildren;	
		}
	},

	add: function(item) {
		if(this.collection === undefined) {
			this.collection = [];
		}
		this.collection.push(item);
		this.listenTo(item, 'open', this.propagateOpenEvent);
		this.trigger('add', item);
	},

	reset: function() {
		this.collection = [];
		this.trigger('reset');
	},

	open: function() {
		if(this.hasChild && this.collection === undefined) {
			this.fetchChildren(this.title)
				.map(function(item) { return new DrillDownMenuItem(item) })
				.forEach(this.add, this);
		}
		this.trigger('open', this);
	},

	propagateOpenEvent: function(item) {
		this.trigger('open', item);
	},
});