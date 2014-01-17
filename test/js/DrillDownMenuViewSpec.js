describe('DrillDownMenuView', function() {
	var $container = $('<div id="container" />');

	beforeEach(function() {
		$('body').append($container);
	});

	it('shows menu on click', function() {
		var view = new DrillDownMenuView({ el: '#container' }).render();
		spyOn(view, 'showMenu');
		view.delegateEvents();
		view.$(':text').click();
		expect(view.showMenu).toHaveBeenCalled();
	});

	afterEach(function() {
		$container.remove();
	});
});