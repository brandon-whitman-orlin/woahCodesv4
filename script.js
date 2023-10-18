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

	// Set up About image scroller
	var imageScroller = document.querySelector(".imageScroller");
	scrollSetup(imageScroller);
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

function scrollSetup(scroller) {
	const imageList = scroller.querySelector(".imageList");
	const imageDesc = scroller.querySelector(".scrollerDesc");
	const imageControls = imageDesc.querySelector(".scrollerControls");
	const imageIndicator = imageControls.querySelector(".scrollerIndex");
	const leftArrow = imageControls.querySelector(".scrollerLeftArrow");
	const rightArrow = imageControls.querySelector(".scrollerRightArrow");
	const titleList = imageDesc.querySelector(".titleHolder");
	const descList = imageDesc.querySelector(".descHolder");
	const imageCredits = imageList.querySelector(".imageCredits");
	const creditName = imageCredits.querySelector("p");
	const creditLink = imageCredits.querySelector("a");

	const imgElements = imageList.querySelectorAll("img");

	imgElements[0].setAttribute("data-state", "active");
	const newDiv = document.createElement("div");
	newDiv.className = "scrollerIndexItem";
	newDiv.setAttribute("data-state", "active");
	imageIndicator.appendChild(newDiv);

	creditName.innerText = imageList.querySelector('[data-state="active"]').getAttribute("data-credit");
	creditLink.href = imageList.querySelector('[data-state="active"]').getAttribute("data-link");

	for (let i = 1; i < imgElements.length; i++) {
		imgElements[i].setAttribute("data-state", "inactive");
		const newDiv = document.createElement("div");
		newDiv.className = "scrollerIndexItem";
		newDiv.setAttribute("data-state", "inactive");
		imageIndicator.appendChild(newDiv);
	}

	const titleElements = titleList.querySelectorAll("h2");
	const descElements = descList.querySelectorAll("p");

	titleElements[0].setAttribute("data-state", "active");
	descElements[0].setAttribute("data-state", "active");

	for (let i = 1; i < titleElements.length; i++) {
		titleElements[i].setAttribute("data-state", "inactive");
	}

	for (let i = 1; i < descElements.length; i++) {
		descElements[i].setAttribute("data-state", "inactive");
	}

	leftArrow.addEventListener("click", function() {
		const activeImage = imageList.querySelector('[data-state="active"]');
		const activeIndicator = imageIndicator.querySelector('[data-state="active"]');
		const activeTitle = titleList.querySelector('[data-state="active"]');
		const activeDesc = descList.querySelector('[data-state="active"]');

		if (activeImage) {
			const activeImageIndex = Array.from(imgElements).indexOf(activeImage);

			if (activeImageIndex !== -1) {
				const previousImageIndex = (activeImageIndex - 1 + imgElements.length) % imgElements.length;

				const previousImage = imgElements[previousImageIndex];
				const previousIndicator = imageIndicator.children[previousImageIndex];
				const previousTitle = titleList.children[previousImageIndex];
				const previousDesc = descList.children[previousImageIndex];

				activeImage.setAttribute("data-state", "inactive");
				previousImage.setAttribute("data-state", "active");
				activeIndicator.setAttribute("data-state", "inactive");
				previousIndicator.setAttribute("data-state", "active");
				activeTitle.setAttribute("data-state", "inactive");
				previousTitle.setAttribute("data-state", "active");
				activeDesc.setAttribute("data-state", "inactive");
				previousDesc.setAttribute("data-state", "active");

				creditName.innerText = previousImage.getAttribute("data-credit");
				creditLink.href = previousImage.getAttribute("data-link");
			}
		}
	});

	rightArrow.addEventListener("click", function() {
		const activeImage = imageList.querySelector('[data-state="active"]');
		const activeIndicator = imageIndicator.querySelector('[data-state="active"]');
		const activeTitle = titleList.querySelector('[data-state="active"]');
		const activeDesc = descList.querySelector('[data-state="active"]');

		if (activeImage) {
			const nextImage = activeImage.nextElementSibling || imgElements[0];
			const nextIndicator = activeIndicator.nextElementSibling || imageIndicator.firstElementChild;
			const nextTitle = activeTitle.nextElementSibling || titleList.firstElementChild;
			const nextDesc = activeDesc.nextElementSibling || descList.firstElementChild;

			if (nextImage) {
				activeImage.setAttribute("data-state", "inactive");
				nextImage.setAttribute("data-state", "active");
				activeIndicator.setAttribute("data-state", "inactive");
				nextIndicator.setAttribute("data-state", "active");
				activeTitle.setAttribute("data-state", "inactive");
				nextTitle.setAttribute("data-state", "active");
				activeDesc.setAttribute("data-state", "inactive");
				nextDesc.setAttribute("data-state", "active");
			}

			creditName.innerText = imageList.querySelector('[data-state="active"]').getAttribute("data-credit");
			creditLink.href = imageList.querySelector('[data-state="active"]').getAttribute("data-link");
		}
	});
}

window.addEventListener('load', function() {
	setTimeout(function() {
	  var elementsToModify = document.querySelectorAll('.rc-anchor-light.rc-anchor-normal, .rc-anchor-light.rc-anchor-compact');
	  for (var i = 0; i < elementsToModify.length; i++) {
		elementsToModify[i].style.borderRadius = '0px';
		elementsToModify[i].style.width = '100%';
		elementsToModify[i].style.boxShadow = 'none';
		elementsToModify[i].style.border = 'none';
		elementsToModify[i].style.backgroundColor = 'transparent';
	  }
	}, 1000); // 1000 milliseconds = 1 second
  });