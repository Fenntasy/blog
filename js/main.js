function checkScroll(zero, more) {
  return function() {
    window.scrollY === 0
      ? zero()
      : more();
  }
}
var setHeaderClass = checkScroll(
  function() {
    document
      .querySelector(".site-header")
      .classList
      .remove("scrolled");
  },
  function() {
    document
      .querySelector(".site-header")
      .classList
      .add("scrolled");
  }
)
window.addEventListener("scroll", setHeaderClass);
window.addEventListener("load", setHeaderClass);