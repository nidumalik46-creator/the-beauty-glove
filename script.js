const affiliateTag = "sumairastor05-20";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const affiliateButtons = document.querySelectorAll(".amazon-button");
const revealItems = document.querySelectorAll(".reveal");
const footerYearTarget = document.querySelector("[data-year]");

function buildAmazonSearchUrl(query) {
  const baseUrl = "https://www.amazon.com/s";
  const url = new URL(baseUrl);

  url.searchParams.set("k", query);

  if (affiliateTag && affiliateTag !== "YOUR-AMAZON-TAG") {
    url.searchParams.set("tag", affiliateTag);
  }

  return url.toString();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

affiliateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const query = button.dataset.query || "beauty products";
    window.open(buildAmazonSearchUrl(query), "_blank", "noopener,noreferrer");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (footerYearTarget) {
  footerYearTarget.textContent = new Date().getFullYear();
}
