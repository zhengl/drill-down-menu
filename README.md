# drill-down-menu

> A drill-down menu based on Backbone and Bootstrap


## Getting Started

Attach to text input as JQuery plugin

```js
$('input').drilldown({
  items: [
    {
      title: 'Asia',
      children: [
        { title: 'China' },
        { title: 'India' }
      ]
    },
    {
      title: 'Europe'
    }
  ]
})
```

or, as a standalone widget

```js
    var topList = new DrillDownMenuItem();
    var itemAsia = new DrillDownMenuItem({ title: 'Asia' });
    var itemEurope = new DrillDownMenuItem({ title: 'Europe' });
    var itemChina = new DrillDownMenuItem({ title: 'China' });
    var itemIndia = new DrillDownMenuItem({ title: 'India' });
    
    var topList.add(itemAsia);
    var topList.add(itemEurope);
    var itemAsia.add(itemChina);
    var itemAsia.add(itemEurope);
    
	var view = new DrillDownMenuView({ items: topList }).render();
```
