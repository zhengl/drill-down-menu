describe('DrillDownMenu', function(){
	it('should be able to parse JSON array into single level menu', function() {
		var json = [
			{ title: 'China' },
			{ title: 'India' },
		];

		var menu = new DrillDownMenu(json);
		var menuItems = getMenuItemElements(menu.getView());
		expectFlatCountryItems(menuItems);
	});

	it('should be able to parse JSON array into multiple level menu', function() {
		var json = [
			{
				title: 'Asia',
				children: [
					{ title: 'China' },
					{ title: 'India' },
				]
			},
			{ 
				title: 'Europe',
				type: 'country'
			},
		];

		var options = {
			iconMappings: function(type) {
				return '<i class="icon" />';
			}
		}

		var menu = new DrillDownMenu(json, options);
		var menuItems = getMenuItemElements(menu.getView());
		expectNestedContinentItems(menuItems);	
	});

	it('should be able to parse dynamic data into single level menu', function() {
		var items = function() {
			return [
						{
							title: 'China',
						},
						{ 
							title: 'India',
						},
					];
		}

		var menu = new DrillDownMenu(items);
		var menuItems = menu.getView().getList().children('li');
		expectFlatCountryItems(menuItems);
	});

	it('should be able to parse dynamic data into multiple level menu', function() {
		var items = function(title) {
			if(title == 'Asia') {
				return [
							{
								title: 'China',
							},
							{ 
								title: 'India',
							},
						];
			}

			return [
						{
							title: 'Asia',
							hasChild: true
						},
						{ 
							title: 'Europe',
						},
					];
		}

		var menu = new DrillDownMenu(items);
		var menuItems = menu.getView().getList().children('li');
		$(menuItems[0]).children('a').click();
		expectNestedContinentItems(menuItems);
	});	
});