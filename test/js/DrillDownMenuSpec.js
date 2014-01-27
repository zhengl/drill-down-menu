describe('DrillDownMenu', function(){
	it('should be able to parse JSON array into single level menu', function() {
		var json = [
			{ title: 'China' },
			{ title: 'India' },
		];

		var menu = new DrillDownMenu(json);
		var menuItems = menu.getView().getList().children('li');
		expect(getTitle(menuItems[0])).toBe('China');
		expect(getTitle(menuItems[1])).toBe('India');
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
				title: 'Europe'
			},
		];

		var menu = new DrillDownMenu(json);
		var menuItems = menu.getView().getList().children('li');
		expect(menuItems.length).toBe(2);
		expect(getTitle(menuItems[0])).toBe('Asia');
		expect(getTitle(menuItems[1])).toBe('Europe');

		expect(menuItems[0].children[1].children.length).toBe(2);
		expect(getTitle(menuItems[0].children[1].children[0])).toBe('China');
		expect(getTitle(menuItems[0].children[1].children[1])).toBe('India');		
	});	
});