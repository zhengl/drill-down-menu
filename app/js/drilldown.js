+function($) {
	var DrillDown = function($input, options) {
		this.$input = $input;
		var menu = new DrillDownMenu(options.items, options.options);
		
		this
			.appendMenuToInput(menu, $input)
			.registerClickEvent($input, menu)
			.registerKeyupEvent($input, menu, options)
			.registerBlurEvent(menu);

	}

	DrillDown.DEFAULTS = $.extend({}, DrillDownMenu.DEFAULTS, {
		items: [],
		isValid: function(item, value) {
			return (new RegExp(value, 'i')).test(item.title)
		}
	});

	DrillDown.prototype.appendMenuToInput = function(menu, $input) {
		$input.after(menu.getView().$el);
		return this;
	};

	DrillDown.prototype.registerClickEvent = function($input, menu) {
		$input.on('click.drilldown', function(e) {
			e.stopPropagation();
			menu.getView().open();
		});
		return this;
	};

	DrillDown.prototype.registerKeyupEvent = function($input, menu, options) {
		var _this = this;
		$input.keyup(function() { 
			var results = [];
			var pushToResults = function(item) { results.push(item) }
			_this.traverseItems(options.items, options.isValid, pushToResults);
			menu.setItems(results);
		});
		return this;
	};

	DrillDown.prototype.registerBlurEvent = function(menu) {
		$(document).on('click.drilldown', function() { menu.getView().close() });
	};

	DrillDown.prototype.traverseItems = function(items, condition, action) {
		var _this = this;
		items.forEach(function(item) {
			if(item.hasOwnProperty('children')) {
				_this.traverseItems(item.children, condition, action);
			} else {
				if(condition(item, _this.getInputValue())) action(item);
			}
		})
	};

	DrillDown.prototype.getInputValue = function() {
		return this.$input.val();
	};


	$.fn.drilldown = function(options) {
		var opt = $.extend({}, DrillDown.DEFAULTS, options);

		return this.each(function() {
			var $this = $(this);
			var drilldown = new DrillDown($this, opt);
		});
	};

}(jQuery);