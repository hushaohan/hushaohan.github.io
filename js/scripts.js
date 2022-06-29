$(window).load(function () {
	$('img').smoothZoom({
	});
});

// $("a[href^='#']").on('click', function (e) {
// 	target = this.hash;
// 	e.preventDefault();
// 	var hash = this.hash;
// 	$('html, body').animate({
// 		scrollTop: $(this.hash).offset().top
// 	}, 300, function () {
// 		window.location.hash = target;
// 	});
// });

$("img").one("load", function (evt) {
    $(this).fadeIn(611);
}).each(function (evt) {
    if (this.complete)
        $(this).load();
});


//Get the button
let mybutton = document.getElementById("return-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$('#links-toggle').on('shown.bs.dropdown', function () {
    $(this).find('a').find('span').toggleClass('fa-caret-down').toggleClass('fa-caret-right');
});
$('#links-toggle').on('hidden.bs.dropdown', function () {
    $(this).find('a').find('span').toggleClass('fa-caret-down').toggleClass('fa-caret-right');
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
