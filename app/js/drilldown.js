+function($) {
	$.fn.drilldown = function() {
		var menu = new DrillDownMenu([]);
		this.menuView = menu.getView();
		var $this = this;
		this.click(function() { $this.menuView.open() });
		return this.menuView.$el;
	};
}(jQuery);