describe('DrillDownMenuView', function() {
	var view;
	var topList = new DrillDownMenuItems();
	var itemList1 = new DrillDownMenuItems({ title: 'Asia' });
	var item1 = new DrillDownMenuItem({ title: 'China' });
	var item2 = new DrillDownMenuItem({ title: 'India' });
	var itemList2 = new DrillDownMenuItems({ 
		title: 'Europe', 
		type: 'country'
	});
	var iconItem = new DrillDownMenuItem({ 
		title: 'Africa',
		type: 'country'
	});

	beforeEach(function() {
		view = new DrillDownMenuView({
			items: topList,
			iconMappings: function(type) {
				return '<i class="icon icon-country"></i>';
			}
		}).render();
	});

	it('should be closed when clicking Close button', function() {
		view.getCloseBtn().click();
		expect(view.$el.hasClass('drilldown-hide')).toBeTruthy();
	});

	describe('MenuItem', function() {
		it('should have a list of items', function() {
			topList.add(item1);
			topList.add(item2);

			var list = view.getList();
			var menuItems = list.children('li');
			expect(menuItems.length).toBe(2);
			expect(getTitle(menuItems[0])).toBe('China');
			expect(getTitle(menuItems[1])).toBe('India');
		});

		it('should display icon', function() {
			topList.reset();
			topList.add(iconItem);

			var list = view.getList();
			var menuItems = list.children('li');
			expect(getIcon(menuItems[0]).hasClass('icon')).toBeTruthy();
		});
	});

	describe('MenuItems', function() {
		beforeEach(function() {
			topList.add(itemList1);
			itemList1.add(item1);
			itemList1.add(item2);

			topList.add(itemList2);
		});

		it('should be able to have nested items', function() {
			var menuItems = view.getList().children('li');
			expect(menuItems.length).toBe(2);
			expect(getTitle(menuItems[0])).toBe('Asia');
			expect(getTitle(menuItems[1])).toBe('Europe');
			expect(menuItems[0].children[1].children.length).toBe(2);
			expect(getTitle(menuItems[0].children[1].children[0])).toBe('China');
			expect(getTitle(menuItems[0].children[1].children[1])).toBe('India');
		});

		it('should display icon', function() {
			var menuItems = view.getList().children('li');
			expect(getIcon(menuItems[1]).hasClass('icon')).toBeTruthy();
		});

		it('should be expandable on click', function() {
			var itemView = view.getItemView(0);
			itemView.$el.children('a').click();
			expect(view.getList().hasClass('drilldown-menu-hide')).toBeTruthy();
		});

		it('should return to top level when clicking Return button', function() {
			var itemView = view.getItemView(0);
			itemView.$el.children('a').click();
			view.getReturnBtn().click();
			expect(view.getList().hasClass('drilldown-menu-hide')).toBeFalsy();
		});		
	});
});