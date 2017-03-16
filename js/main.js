var testimonials = [ 1, 2, 3 ];

var active = 1;

var canvas, ctx;

function init() {
	canvas = document.getElementById("sheet");

	canvas.width = document.body.offsetWidth;
	canvas.height = document.body.offsetHeight;

	ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	grid();

	canvas.className = "fix visible";
}

function grid() {
	for (var i = 0; i <= canvas.width + 20; i += 20) {
		for (var j = 0; j < canvas.height; j += 20) {
			ctx.beginPath();
			ctx.arc(i, j, 3, 0, Math.PI * 2, false);
			ctx.fillStyle = "#E5E1EE";
			ctx.fill();
			ctx.closePath();
		}
	}
}

function setListener(element) {
	element.addEventListener('click', function (event) {
		scroll(element);

		event.preventDefault();
	});
}

function scroll(element) {
	var to = document.getElementById(element.getAttribute("href").substring(1, element.getAttribute("href").length)).offsetTop;
	var duration = 400;

	doScroll(element, to, duration);
}

function doScroll(element, to, duration) {
	if (duration <= 0) return;
	var difference = to - document.body.scrollTop;
	var perTick = difference / duration * 10;

	setTimeout(function() {
		document.body.scrollTop = document.body.scrollTop + perTick;
		if (document.body.scrollTop == to) return;
		doScroll(element, to, duration - 10);
	}, 10);
}

function nicethings(state) {
	if (active == 0 && state =="previous")
		active = testimonials.length;
	else if (active == (testimonials.length - 1) && state =="next")
		active = -1;

	if (state == "previous")
		active--;
	else if (state == "next")
		active++;

	document.getElementById("testimonial" + testimonials[active]).checked = true;
}

document.getElementById("sheet").addEventListener("mousemove", function (event) {
	var xprime = event.clientX;
	var yprime = event.clientY;

	var xremainder = xprime % 20;
	var yremainder = yprime % 20;

	var x = (xremainder > 10) ? xprime + (20 - xremainder) : xprime - xremainder;
	var y = (yremainder > 10) ? yprime + (20 - yremainder) : yprime - yremainder;

	ctx.restore();

	ctx.beginPath();
	ctx.arc(x, y, 3, 0, Math.PI * 2, false);
	ctx.fillStyle = "#167eff";
	ctx.fill();
	ctx.closePath();
});

window.onload = function () {
	var elems = document.getElementsByTagName("a");
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].hasAttribute("anchor")) {
			if (elems[i].getAttribute("anchor")) setListener(elems[i]);
		}
	}

	document.getElementById("nicethingslist").className += "ed";

	document.getElementById("nicethingsbtn").style.display = "block";

	document.getElementById("nicethingsprv").addEventListener('click', function () { nicethings("previous") });
	document.getElementById("nicethingsnxt").addEventListener('click', function () { nicethings("next") });

	init();
}

window.onresize = function () {
	init();
}