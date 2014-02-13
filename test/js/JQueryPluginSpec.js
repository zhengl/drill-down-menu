describe('JQueryPlugin', function() {
	var $input;
	var $el;
	var items = [
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

	beforeEach(function() {
		$input = $('<input>');
		$('body').append($input);	
	});

	describe('with static data', function(){
		beforeEach(function() {
			$input.drilldown({
				items: items
			});
			
			$el = $input.next();
		});

		it('should have options for initializing of items as JSON', function() {
			var menuItems = $el.children('.drilldown-menu').children('li');

			expectNestedContinentItems(menuItems);
		});

		it('should be attached to a text input', function() {
			expect($el.hasClass('drilldown-hide')).toBeTruthy();

			$input.click();
			expect($el.hasClass('drilldown-hide')).toBeFalsy();
		});

		it('should be hidden when clicking on elsewhere', function() {
			expect($el.hasClass('drilldown-hide')).toBeTruthy();

			$input.click();
			expect($el.hasClass('drilldown-hide')).toBeFalsy();

			$('html').click();
			expect($el.hasClass('drilldown-hide')).toBeTruthy();
		});

		it('should auto-complete', function() {
			$input.val('c').keyup();

			var menuItems = $el.children('.drilldown-menu').children('li');

			expect(menuItems.length).toBe(1);
			expect(getTitle(menuItems[0])).toBe('China');
		});
	});

	describe('with dynamic data', function() {
		beforeEach(function() {
			$input.drilldown({
				items: function() {
					return [
								{
									title: 'Asia',
								},
								{ 
									title: 'Europe'
								},
							];
				}
			});
			
			$el = $input.next();
		});

		xit('should have options for initializing of items as a function', function() {
			var menuItems = $el.children('.drilldown-menu').children('li');

			expect(menuItems.length).toBe(2);
			expect(getTitle(menuItems[0])).toBe('Asia');
			expect(getTitle(menuItems[1])).toBe('Europe');
		});		
	});

	describe('with options', function() {
		it('should be able to bind events to children', function() {
			var clickSpy = jasmine.createSpy();
			$input.drilldown({
				items: items,
				options: {
					events: {
						'click :child': clickSpy
					}
				}
			});
			
			$el = $input.next();

			var menuItems = $el.children('.drilldown-menu').children('li');
			$(menuItems[0].children[1].children[0]).click();
			expect(clickSpy).toHaveBeenCalled();
		});

		it('should be able to bind events to children with title', function() {
			var clickSpy = jasmine.createSpy();
			$input.drilldown({
				items: items,
				options: {
					events: {
						'click India:child': clickSpy
					}
				}
			});
			
			$el = $input.next();

			var menuItems = $el.children('.drilldown-menu').children('li');
			$(menuItems[0].children[1].children[0]).click();
			expect(clickSpy).not.toHaveBeenCalled();
			$(menuItems[0].children[1].children[1]).click();
			expect(clickSpy).toHaveBeenCalled();
		});

		it('should be able to bind events to parents', function() {
			var clickSpy = jasmine.createSpy();
			$input.drilldown({
				items: items,
				options: {
					events: {
						'click :parent': clickSpy
					}
				}
			});
			
			$el = $input.next();

			var menuItems = $el.children('.drilldown-menu').children('li');			
			$(menuItems[0]).click();
			expect(clickSpy).toHaveBeenCalled();
		});

		it('should be able to bind events to parents with title', function() {
			var clickSpy = jasmine.createSpy();
			$input.drilldown({
				items: items,
				options: {
					events: {
						'click Europe:parent': clickSpy
					}
				}
			});
			
			$el = $input.next();

			var menuItems = $el.children('.drilldown-menu').children('li');			
			$(menuItems[1]).click();
			expect(clickSpy).not.toHaveBeenCalled();
		});			
	});

	afterEach(function() {
		$input.remove();
		$el.remove();
	});
	
});