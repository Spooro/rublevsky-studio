let currentPixel = window.pageYOffset;

const looper = function() {
	const newPixel = window.pageYOffset;
	const diff = newPixel - currentPixel;
	const speed = diff * 0.1;

	const blur = speed < 0 ? speed * -1 : speed;

	TweenMax.to("#test", .5, { attr: { stdDeviation: "0" + blur * 1 } });

	currentPixel = newPixel;

	requestAnimationFrame(looper);
};

looper();