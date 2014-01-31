var DrillDownMenuItems = Backbone.Model.extend({
	initialize: function() {
		this.collection = new Backbone.Collection();
	},

	add: function(item) {
		this.collection.add(item);
		this.listenTo(item, 'open', this.propagateOpenEvent);
		this.trigger('add', item);
	},

	reset: function() {
		this.collection.reset();
		this.trigger('reset');
	},

	propagateOpenEvent: function(item) {
		this.trigger('open', item);
	}
});