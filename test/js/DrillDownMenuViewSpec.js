describe('DrillDownMenuView', function() {
	var topList;
	var itemListAsia;
	var itemChina;
	var itemIndia;
	var itemListEurope;
	var iconItemAfrica;

	beforeEach(function() {
		topList = new DrillDownMenuItem();
		itemListAsia = new DrillDownMenuItem({ title: 'Asia' });
		itemChina = new DrillDownMenuItem({ title: 'China' });
		itemIndia = new DrillDownMenuItem({ title: 'India' });
		itemListEurope = new DrillDownMenuItem({ 
			title: 'Europe', 
			type: 'country'
		});
		iconItemAfrica = new DrillDownMenuItem({ 
			title: 'Africa',
			type: 'country'
		});

	});

	describe('with item insertion after view initialization', function() {
		var view;

		beforeEach(function() {
			view = new DrillDownMenuView({
				items: topList,
				iconMappings: function(type) {
					return '<i class="icon icon-country"></i>';
				}
			}).render();
		});

		describe('with single-level list', function() {
			it('should be closed when clicking Close button', function() {
				view.getCloseBtn().click();
				expect(view.$el.hasClass('drilldown-hide')).toBeTruthy();
			});

			it('should add items to list', function() {
				topList.add(itemChina);
				topList.add(itemIndia);

				var menuItems = getMenuItemElements(view);
				expectFlatCountryItems(menuItems);
			});

			it('should display icon', function() {
				topList.add(iconItemAfrica);

				var menuItems = getMenuItemElements(view);
				expect(getIcon(menuItems[0]).hasClass('icon')).toBeTruthy();
			});
		});


		describe('with multi-level list', function() {
			beforeEach(function() {
				topList.add(itemListAsia);
				itemListAsia.add(itemChina);
				itemListAsia.add(itemIndia);

				topList.add(itemListEurope);
			});

			it('should be able to have nested items', function() {
				var menuItems = getMenuItemElements(view);

				expectNestedContinentItems(menuItems);
			});

			it('should display icon', function() {
				var menuItems = getMenuItemElements(view);

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


	describe('with list insertion before view initialization', function() {
		var view;

		it('should render a list of items', function() {
			topList.add(itemChina);
			topList.add(itemIndia);

			view = new DrillDownMenuView({
				items: topList,
			}).render();

			var menuItems = getMenuItemElements(view);
			expectFlatCountryItems(menuItems);
		});

	});
});