describe('DrillDownMenuView', function() {
	var $container = $('<div id="container" />');
	var view;
	var items;

	beforeEach(function() {
		$('body').append($container);
		items = new DrillDownMenuItems();
		view = new DrillDownMenuView({
			items: items,
		}).render();
		$container.append(view.el);
		view.show();
	});

	it('should have a list of items', function() {
		var item1 = new DrillDownMenuItem({
			title: 'Asia'
		});
		var item2 = new DrillDownMenuItem({
			title: 'Europe'
		})
		items.add(item1);
		items.add(item2);

		var list = view.$el;
		expect(list.get(0).nodeName).toBe('UL');
		var menuItems = list.children('li');
		expect(menuItems[0].textContent).toBe('Asia');
		expect(menuItems[1].textContent).toBe('Europe');
	});

	afterEach(function() {
		$container.remove();
	});
});