const bar = document.querySelector(".bar");
const links = document.querySelector("header .links");

bar.addEventListener("click", (e) => {
  links.classList.toggle("show");
  e.stopPropagation();
});
document.addEventListener("click", () => {
  links.classList.remove("show");
});

/* ======================== */

let year = new Date().getFullYear();
let copyrightYear = document.querySelector("footer .last p span");

copyrightYear.textContent = year;

/* ======================== */
const scrollIndicator = document.querySelector(".scroll");

window.addEventListener("scroll", () => {
  let opacity = 1 - window.scrollY / 300;

  opacity = Math.max(.3, opacity);

  scrollIndicator.style.opacity = opacity;
});
/* ======================== */
const about = document.querySelector(".about p");

window.onscroll = function () {
  if (window.scrollY >= 300) {
    about.style.transform = "translateY(0px)";
    about.style.transition = ".5s";
    about.style.opacity = "1";
  } else {
    about.style.transform = "translateY(50px)";
    about.style.opacity = "0";
  }
};
