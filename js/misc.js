$('[data-toggle="tooltip"]').tooltip({
	'placement': 'top'
});

$(window).load( function() {
	$('img').smoothZoom({
		resizeDelay: 21,
		zoominSpeed: 611,
		zoomoutSpeed: 611,
	});
});

$("a[href^='#']").on('click', function(e) {
	target = this.hash;
	e.preventDefault();
	var hash = this.hash;
	$('html, body').animate({
		scrollTop: $(this.hash).offset().top
	}, 300, function(){
		window.location.hash = target;
	});
});
