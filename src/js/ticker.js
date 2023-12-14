'use strict';

$(() => {
	const newsItems = $(".ticker li");

	showNext(newsItems, 0);
});

function showNext(newsItems, index) {
	if (index < newsItems.length) {
		// Hide all items
		newsItems.each(function (itemInde, item) {
			item.style.display = 'none';
		});

		// Show the current item
		newsItems[index].style.display = 'block';

		index++;

		// Call the function recursively after a certain delay
		setTimeout(() => showNext(newsItems, index), 4000); // Adjust the time delay (in milliseconds) between news items
	}
}