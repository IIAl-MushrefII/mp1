// main.js

(() => {
  const nav = document.getElementById("navbar");
  const progress = document.getElementById("progress");
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // Smooth-scroll to section accounting for sticky navbar height
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const navH = nav.getBoundingClientRect().height;
      const top =
        window.scrollY + target.getBoundingClientRect().top - navH + 1;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  function update() {
    // current vertical position in pixels from top
    const currentPosition = window.scrollY;
    // amount of height the user can scroll
    const scrollAmount =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // shrink: https://www.w3schools.com/howto/howto_js_navbar_shrink_scroll.asp
    // Adjusted by using class shrink instead of directlry modifying properties
    if (currentPosition > 20) nav.classList.add("shrink");
    else nav.classList.remove("shrink");

    // progress logic: https://www.30secondsofcode.org/css/s/scroll-progress-bar/
    // determine scroll percentage of document and apply it to witdth of progress bar
    progress.style.width = `${(currentPosition / scrollAmount) * 100}%`;

    sections.forEach((sec, i) => {
      // top of page to top of section
      let sectionOffset = sec.offsetTop - 150;
      let sectionHeight = sec.offsetHeight;

      if (
        currentPosition >= sectionOffset &&
        currentPosition < sectionOffset + sectionHeight
      ) {
        links.forEach((link) => link.classList.remove("active"));
        links[i].classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
})();

// carousel
// === Simple Carousel
// http://w3schools.com/howto/howto_js_slideshow.asp
(() => {
  let slideIndex = 1;

  const slides = Array.from(document.querySelectorAll("#carousel .slide"));
  const prevBtn = document.querySelector("#carousel .prev");
  const nextBtn = document.querySelector("#carousel .next");

  if (!slides.length || !prevBtn || !nextBtn) return;

  function showSlide(n) {
    // wrap around
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // hide all, show one
    slides.forEach((s) => (s.style.display = "none"));
    slides[slideIndex - 1].style.display = "block";
  }

  function plusSlides(step) {
    slideIndex += step;
    showSlide(slideIndex);
  }

  // init
  showSlide(slideIndex);

  // controls
  prevBtn.addEventListener("click", () => plusSlides(-1));
  nextBtn.addEventListener("click", () => plusSlides(1));
})();

// Simple Lightbox (ref-style)
(() => {
  const imgs = document.querySelectorAll(".gallery-grid img");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const imgEl = document.getElementById("lightbox-img");
  const btnClose = document.querySelector(".close-modal");

  if (!imgs || !modal || !overlay || !imgEl || !btnClose) return;

  const open = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  const close = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  // Open on gallery image click
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      imgEl.src = img.src;
      imgEl.alt = img.alt || "Coffee";
      open();
    });
  });

  // Close interactions
  btnClose.addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
  });
})();
