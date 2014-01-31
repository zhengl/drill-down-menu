function getTitle(el) {
	return $(el).children('a').text();
}

function getIcon(el) {
	return $(el).children('a').children('.icon');
}