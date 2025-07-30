
document.querySelectorAll(".paralax").forEach((element) => {
	let strength = 80;
	if (element.dataset.paralax) strength = Number(element.dataset.paralax);
	document.body.addEventListener("mousemove", (event) => {
		const left = (event.clientX - window.innerWidth / 2) / strength;
		const top = (event.clientY - window.innerHeight / 2) / strength;
		element.style.transform = `translate(${left}px,${top}px)`;
	});
});
function getVisibilityRatio(element) {
	const rect = element.getBoundingClientRect();
	const windowHeight = window.innerHeight;
	// Determine how much of the element is visible vertically
	const visibleHeight = Math.min(rect.bottom, windowHeight) -
		Math.max(rect.top, 0);
	const ratio = Math.max(0, Math.min(visibleHeight / rect.height, 1));
	return ratio;
}
(() => {
	const panel = document.getElementById("panel");
	const bar = document.getElementById("bar");
	const percent_base = 0.8;
	window.addEventListener("scroll", () => {
		const pages_scrolled = 1 + (getVisibilityRatio(panel) - 1);
		panel.style.borderRadius = `calc((var(--border-radius)*2)*${1 - pages_scrolled
			})`;
		bar.style.borderRadius = `
                var(--border-radius)
                var(--border-radius)
                calc(var(--border-radius*${1 - pages_scrolled})
                calc(var(--border-radius*${1 - pages_scrolled})`;
		const scale_round = Math.ceil(pages_scrolled * 100) / 100;
		panel.style.scale = percent_base + (scale_round * (1 - percent_base));
	});
})();
(() => {
	const home = document.getElementById("home");
	window.addEventListener("scroll", () => {
		const pages_scrolled = window.scrollY / window.innerHeight;
		home.style.cssText = `
          opacity: ${1 - pages_scrolled} !important;
          filter: blur(calc(var(--blur-amount)*${pages_scrolled})) !important;;
					`;
	});
})();
// scroll to the top of the page
window.onload = function() {
	history.scrollRestoration = "manual";
	window.scrollTo(0, 0);
};
function _hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		}
		: null;
}
function rand(min, max) {
	return (randomIntInRange = Math.floor(Math.random() * (max - min + 1)) + min);
}
function generate_similar_color(hex, randomness) {
	hex = hex.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	const sim = Math.floor(255 * (randomness / 100));
	function rand(base, variation) {
		const min = Math.max(0, base - variation);
		const max = Math.min(255, base + variation);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	const newR = rand(r, sim);
	const newG = rand(g, sim);
	const newB = rand(b, sim);
	return `rgb(${newR},${newG},${newB})`;
}
(() => {
	function setCharAt(str, index, chr) {
		if (index > str.length - 1) return str;
		return str.substring(0, index) + chr + str.substring(index + 1);
	}
	const color = document.getElementById("background");
	let colors = "linear-gradient(";
	for (let i = 0; i < 10; i++) {
		colors += `${generate_similar_color("#ff00ff", 60)},`;
	}
	document.documentElement.style.setProperty(
		"--background-animation-initial-angle",
		rand(0, 360),
	);
	colors = setCharAt(colors, colors.length - 1, ")");
	color.style.background = colors;
})();
const root = getComputedStyle(document.documentElement);
let delay = root.getPropertyValue("--loader-time");
delay = Number(delay.slice(0, -1)) * 1000;
document.addEventListener("DOMContentLoaded", function() {
	window.scrollTo(0, 0);
});
setTimeout(() => {
	const lenis = new Lenis();
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}, delay);

const scroll = document.getElementById("scroll-button");
window.addEventListener("scroll", () => {
	const scrollableHeight = document.documentElement.scrollHeight -
		window.innerHeight;
	let scrollpercent = (window.scrollY / scrollableHeight) * window.innerHeight;
	scroll.style.marginTop = scrollpercent + "px";
});

const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
	cursorPos.x = e.clientX;
	cursorPos.y = e.clientY;
	cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
	const easting = 8;
	cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
	cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;
	cursorBorder.style.transform =
		`translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
	requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach((item) => {
	if (item.dataset.cursorImage) {
		item.style.backgroundImage = item.dataset.cursorImage;
	}
	item.addEventListener("mouseover", () => {
		if (item.dataset.cursorImage) {
			cursorBorder.style.setProperty(
				"--background-image",
				item.dataset.cursorImage,
			);
		}
		cursorBorder.classList.add(item.dataset.cursor);
	});
	item.addEventListener("mouseout", () => {
		cursorBorder.className = "";
		cursorBorder.style.setProperty("--background-image", "");
	});
});




(() => {
	// isolated function 
	const form_email = document.getElementById("form-email");
	const form_body = document.getElementById("form-body");
	const submit = document.getElementById("form-send");
	const form_body_count = document.getElementById("form-body-count");
	const MAX_COUNT = 127;

	function set_count(content) {
		form_body_count.innerText = `${content.length}/${MAX_COUNT - 1}`
	}

	set_count("");
	form_body.addEventListener("input", () => {
		if (form_body.value.length >= MAX_COUNT) {
			window.alert(`Only ${MAX_COUNT} letters allowed`);
			form_body.value = form_body.value.slice(0, -1);
		} else set_count(form_body.value);
	});

	// validate an email by checking if it contains a '.' and a '@'
	function isValidEmail(email) {
		if (
			!email.includes(".") ||
			!email.includes("@") ||
			email.length < 6)
			return 1;
		return 0;
	}

	form_email.addEventListener("focusout", () => {
		form_email.classList.remove("error");
		if (isValidEmail(form_email.value) == 1) {
			form_email.classList.add("error");
		}
	});
})();
