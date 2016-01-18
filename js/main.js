
function checkScroll(zero, more) {
  return function() {
    if (window.scrollY === 0) {
      zero();
    } else {
      more();
    }
  }
}
var setHeaderClass = checkScroll(
  function() {
    document.querySelector(".site-header").classList.remove("scrolled");
  },
  function() {
    document.querySelector(".site-header").classList.add("scrolled");
  }
)
window.addEventListener("scroll", setHeaderClass);
window.addEventListener("load", setHeaderClass);