(function () {
	const PRELOADER_KEY = 'preloader_last_shown';
	const ONE_HOUR = 60 * 60 * 1000;

	const preloader = document.getElementById('preloader');
	const video = document.getElementById('preloaderVideo');
	const startBtn = document.getElementById('startBtn');

	if (!preloader || !video || !startBtn) return;

	const lastShown = localStorage.getItem(PRELOADER_KEY);
	const now = Date.now();

	if (lastShown && now - lastShown < ONE_HOUR) {
		preloader.classList.add('hidden');
		return;
	}

	preloader.classList.remove('hidden');

	const desktopSrc = preloader.dataset.videoDesktop;
	const mobileSrc = preloader.dataset.videoMobile;

	function getVideoSrc() {
		return window.innerWidth <= 768 ? mobileSrc : desktopSrc;
	}

	video.src = getVideoSrc();

	startBtn.addEventListener('click', () => {
		startBtn.style.display = 'none';
		video.play().catch(console.warn);
	});

	video.addEventListener('ended', hidePreloader);
	video.addEventListener('error', hidePreloader);
	document.body.classList.add('preloader-active');

	function hidePreloader() {
		preloader.classList.add('hidden');
		document.body.classList.remove('preloader-active');
		localStorage.setItem(PRELOADER_KEY, Date.now().toString());
	}
})();

$(document).ready(function () {
	// Fancybox init
	if (document.querySelector('[data-fancybox]')) {
		Fancybox.bind('[data-fancybox]', {
			dragToClose: false,
			closeButton: false,
		});
	}

	// Reviews carousel swiper
	const reviews__carousel = document.querySelector('.reviews__carousel');
	if (reviews__carousel) {
		const swiper = new Swiper(reviews__carousel, {
			slidesPerView: 'auto',
			allowTouchMove: true,
			spaceBetween: 20,
			loop: true,
			speed: 700,
			//autoplay: true,
			pagination: {
				el: '.reviews--pagi',
				clickable: true,
			},
			navigation: {
				nextEl: '.reviews--navi-next',
				prevEl: '.reviews--navi-prev',
			},
		});
	}

});

// Add .header--scroll to Header
function updateHeaderScrollClass() {
	const header = document.querySelector('.header');
	if (!header) return;

	if (window.scrollY > 0) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
}
document.addEventListener('scroll', updateHeaderScrollClass);
document.addEventListener('DOMContentLoaded', updateHeaderScrollClass);

// Scroll links
document.addEventListener('DOMContentLoaded', function () {
	const OFFSET_DESKTOP = 0;
	const OFFSET_MOBILE = 70;
	const MOBILE_BREAKPOINT = 1199.98;

	const header = document.querySelector('.header');
	const burgerBtn = document.querySelector('.header__mobile-burger');
	const mobileMenu = document.querySelector('.header__mobile-menu');

	if (burgerBtn && mobileMenu && header) {
		burgerBtn.addEventListener('click', function () {
			burgerBtn.classList.toggle('active');
			mobileMenu.classList.toggle('active');
			header.classList.toggle('open-menu');
		});
	}

	function getHeaderOffset() {
		return window.innerWidth <= MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
	}

	function scrollToTarget(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = getHeaderOffset();
			const top = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({
				top: top,
				behavior: 'smooth'
			});
		}
	}

	function handleLinkClick(e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#') && href.length > 1) {
			e.preventDefault();
			const id = href.substring(1);
			scrollToTarget(id);

			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				burgerBtn.classList.remove('active');
				mobileMenu.classList.remove('active');
				header.classList.remove('open-menu');
			}
		}
	}

	const links = document.querySelectorAll('a[href^="#"]:not([href="#"]), .scroll-btn');
	links.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});
});

// Scroll to Top
document.addEventListener("DOMContentLoaded", function () {
	const scrollTopBtn = document.getElementById("scr_top");
	const scrollOffset = 800;

	if (!scrollTopBtn) return;

	window.addEventListener("scroll", () => {
		scrollTopBtn.classList.toggle("visible", window.scrollY > scrollOffset);
	});

	scrollTopBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
});

// How we work carousel swiper
document.addEventListener('DOMContentLoaded', function () {
	const breakpoint = 767.98;
	const carousels = document.querySelectorAll('.howwork__carousel');

	if (!carousels.length) return;

	carousels.forEach((carousel) => {
		let swiperInstance = null;
		const initOrDestroy = () => {
			if (window.innerWidth <= breakpoint) {
				if (!swiperInstance) {
					swiperInstance = new Swiper(carousel, {
						slidesPerView: 1.1,
						spaceBetween: 20,
						allowTouchMove: true,
						loop: false,
						speed: 600,
					});
				}
			} else {
				if (swiperInstance) {
					swiperInstance.destroy(true, true);
					swiperInstance = null;
				}
			}
		};
		initOrDestroy();
		window.addEventListener('resize', initOrDestroy);
	});
});

// Default carousel swiper
document.addEventListener('DOMContentLoaded', function () {
	const breakpoint = 767.98;
	const carousels = document.querySelectorAll('.def-carousel');

	if (!carousels.length) return;

	carousels.forEach((carousel) => {
		let swiperInstance = null;
		const initOrDestroy = () => {
			if (window.innerWidth <= breakpoint) {
				if (!swiperInstance) {
					swiperInstance = new Swiper(carousel, {
						slidesPerView: 1.1,
						spaceBetween: 20,
						allowTouchMove: true,
						loop: false,
						speed: 600,
					});
				}
			} else {
				if (swiperInstance) {
					swiperInstance.destroy(true, true);
					swiperInstance = null;
				}
			}
		};
		initOrDestroy();
		window.addEventListener('resize', initOrDestroy);
	});
});

// Toggles
document.addEventListener('DOMContentLoaded', function () {
	const toggleBlocks = document.querySelectorAll('.block__toggle');

	if (toggleBlocks.length === 0) {
		return;
	}

	toggleBlocks.forEach(block => {
		const header = block.querySelector('.toggle__header');
		const button = block.querySelector('.toggle__header-btn');
		const content = block.querySelector('.toggle__content');

		if (!header || !button || !content) {
			return;
		}

		header.addEventListener('click', function () {
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				content.style.paddingBottom = null;
				button.classList.remove('v_active');
				content.classList.remove('c_active');
				block.classList.remove('t_active');
			} else {
				content.style.maxHeight = content.scrollHeight + 18 + 'px';
				content.style.paddingBottom = '18px';
				button.classList.add('v_active');
				content.classList.add('c_active');
				block.classList.add('t_active');
			}
		});
	});
});

// Services Tabs
document.addEventListener("DOMContentLoaded", function () {
	const tabsContainer = document.querySelector(".intabs");
	if (!tabsContainer) return;

	const tabs = tabsContainer.querySelectorAll(".intabs__nav-tab");
	const items = tabsContainer.querySelectorAll(".intabs__item");

	if (tabs.length === 0 || items.length === 0) return;

	function activateTab(index) {
		tabs.forEach(tab => tab.classList.remove("active"));
		items.forEach(item => item.classList.remove("active"));

		const activeTab = tabsContainer.querySelector(`.intabs__nav-tab[data-index="${index}"]`);
		const activeItem = tabsContainer.querySelector(`.intabs__item[data-index="${index}"]`);

		if (activeTab) activeTab.classList.add("active");
		if (activeItem) activeItem.classList.add("active");
	}

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			const index = tab.getAttribute("data-index");
			activateTab(index);
		});
	});

	activateTab(0);
});

// Popup
document.addEventListener('DOMContentLoaded', function () {
	const POPUP_ID = 'promo_popup';
	const STORAGE_KEY = 'promo_popup_last_show';
	const SHOW_DELAY = 18000;
	const COOLDOWN = 60 * 60 * 1000;

	const popupEl = document.getElementById(POPUP_ID);
	if (!popupEl) return;

	let popupOpened = false;
	let popupTimer = null;

	const lastShow = localStorage.getItem(STORAGE_KEY);
	const now = Date.now();

	function openPopup() {
		if (popupOpened) return;

		popupOpened = true;

		Fancybox.show([
			{
				src: '#' + POPUP_ID,
				type: 'inline',
			},
		], {
			dragToClose: false,
			closeButton: false,
			backdropClick: false,

			on: {
				destroy: () => {
					popupOpened = false;
				}
			}
		});
	}

	if (!(lastShow && now - lastShow < COOLDOWN)) {
		popupTimer = setTimeout(function () {
			openPopup();
			localStorage.setItem(STORAGE_KEY, Date.now());
		}, SHOW_DELAY);
	}

	document.addEventListener('click', function (e) {
		const trigger = e.target.closest('[data-popup="promo"]');
		if (!trigger) return;

		e.preventDefault();

		if (popupTimer) {
			clearTimeout(popupTimer);
		}

		openPopup();
	});

	document.addEventListener('click', function (e) {
		const btn = e.target.closest('.promo-popup .scroll-btn');
		if (!btn) return;

		setTimeout(function () {
			Fancybox.close();
		}, 600);
	});

});