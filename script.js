document.addEventListener('DOMContentLoaded', function() {
	// Collapse header when page is scrolled
	window.addEventListener("scroll", collapseHeader);

	// Calculate current scrollY to show progress bar
	window.addEventListener("scroll", progressBar);

	// Handle collapsing nav
	var nav = document.querySelector("nav");
	nav.addEventListener("click", function() {
		navMenu(nav);
	});

	// Theme selection
	var storedColorMode = localStorage.getItem("colorMode");
	presetTheme(storedColorMode);
	var colorMode = document.getElementById("colorMode");
	colorMode.addEventListener("click", changeTheme);
});

function presetTheme(theme) {
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', "dark");
	} else {
		document.documentElement.setAttribute('data-theme', "light");
	}
}

function changeTheme() {
	if (document.documentElement.getAttribute('data-theme') == "dark") {
		document.documentElement.setAttribute('data-theme', "light");
		localStorage.setItem("colorMode", "light");
	} else {
		document.documentElement.setAttribute('data-theme', "dark");
		localStorage.setItem("colorMode", "dark");
	}
}

function collapseHeader() {
	const header = document.querySelector("header");

	if (window.scrollY >= 10) {
		header.setAttribute("data-state", "collapsed");
	} else {
		header.setAttribute("data-state", "expanded");
	}
}

function navMenu(nav) {
	if (nav.getAttribute('data-state') == "collapsed") {
		nav.setAttribute('data-state', "expanded");
	} else {
		nav.setAttribute('data-state', "collapsed");
	}
}

function progressBar() {
	const header = document.querySelector(".progressBar");
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const scrollY = window.scrollY;

	const scrollProgress = (scrollY / scrollableHeight) * 100;

	header.style.setProperty("--scrollAmount", `${scrollProgress}%`);
}