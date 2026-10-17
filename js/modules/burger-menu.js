function initBurgerMenu() {
  const nav = document.querySelector(".header__nav");
  const burger = document.querySelector(".header__burger");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("header__nav--open");
    burger.setAttribute("aria-expanded", isOpen);
  });
}

export { initBurgerMenu };
