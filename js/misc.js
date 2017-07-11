$('[data-toggle="tooltip"]').tooltip({
	'placement': 'top'
});

$(window).load(function () {
	$('img').smoothZoom({
	});
});

$("a[href^='#']").on('click', function (e) {
	target = this.hash;
	e.preventDefault();
	var hash = this.hash;
	$('html, body').animate({
		scrollTop: $(this.hash).offset().top
	}, 300, function () {
		window.location.hash = target;
	});
});

$("img").one("load", function (evt) {
    $(this).fadeIn(611);
}).each(function (evt) {
    if (this.complete)
        $(this).load();
});


// ===== Scroll to Top ====
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

$('#links-toggle').on('shown.bs.dropdown', function () {
    $(this).find('a').find('span').toggleClass('fa-caret-down').toggleClass('fa-caret-right');
});
$('#links-toggle').on('hidden.bs.dropdown', function () {
    $(this).find('a').find('span').toggleClass('fa-caret-down').toggleClass('fa-caret-right');
});
