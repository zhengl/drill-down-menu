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

	describe('MenuItem', function() {
		it('should have a list of items', function() {
			topList.add(item1);
			topList.add(item2);

			var list = view.$el;
			expect(list.get(0).nodeName).toBe('UL');

			var menuItems = list.children('li');
			expect(getTitle(menuItems[0])).toBe('China');
			expect(getTitle(menuItems[1])).toBe('India');
		});
	});

	describe('MenuItems', function() {
		beforeEach(function() {
			topList.add(itemList1);
			itemList1.add(item1);
			itemList1.add(item2);
		});

		it('should be able to have nested items', function() {
			var menuItems = view.$el.children('li');
			expect($(menuItems[0]).children('a').text()).toBe('Asia');
			expect(getTitle(menuItems[0].children[1].children[0])).toBe('China');
			expect(getTitle(menuItems[0].children[1].children[1])).toBe('India');
		});

		it('should be expendable on click', function() {
			var itemView = view.getItemView(0);
			itemView.$el.children('a').click();
			expect(view.$el.hasClass('dropdown-menu-hide')).toBeTruthy();
		});
	});

	function getTitle(el) {
		return $(el).children('a').text();
	}
});