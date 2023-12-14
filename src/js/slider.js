'use strict';

jQuery(document).ready(function ($) {
	$(".product_slider").slick({
		slidesToShow: 3,
		infinite: true,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-custom-arrow slick-prev"> < </button>',
		nextArrow: '<button type="button" class="slick-custom-arrow slick-next"> > </button>'
	});

});