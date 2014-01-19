describe('DrillDownMenuView', function() {
	var view;

	var topList = new DrillDownMenuItems();
	var itemList1 = new DrillDownMenuItems({ title: 'Asia' });
	var itemList2 = new DrillDownMenuItems({ title: 'Europe' });
	var item1 = new DrillDownMenuItem({ title: 'China' });
	var item2 = new DrillDownMenuItem({ title: 'India' });

	beforeEach(function() {
		view = new DrillDownMenuView({
			items: topList,
		}).render();
	});

	it('should have a list of items', function() {
		topList.add(item1);
		topList.add(item2);

		var list = view.$el;
		expect(list.get(0).nodeName).toBe('UL');

		var menuItems = list.children('li');
		expect(getTitle(menuItems[0])).toBe('China');
		expect(getTitle(menuItems[1])).toBe('India');
	});

	it('should be able to have nested items', function() {
		topList.add(itemList1);
		itemList1.add(item1);
		itemList1.add(item2);

		var menuItems = view.$el.children('li');
		expect($(menuItems[0]).children('a').text()).toBe('Asia');
		expect(getTitle(menuItems[0].children[1].children[0])).toBe('China');
		expect(getTitle(menuItems[0].children[1].children[1])).toBe('India');
	});

	function getTitle(el) {
		return $(el).children('a').text();
	}
});