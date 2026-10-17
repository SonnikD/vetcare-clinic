function initFilters() {
  const container = document.querySelector(".services");
  if (!container) return;

  const cards = container.querySelectorAll("[data-tag]");
  const buttons = container.querySelectorAll("[data-filter]");

  buttons.forEach((clicked) => {
    clicked.addEventListener("click", () => {
      const selected = clicked.dataset.filter;

      buttons.forEach((button) => {
        const isActive = button.dataset.filter === selected;
        button.classList.toggle("tag--active", isActive);
        button.setAttribute("aria-pressed", isActive);
      });

      cards.forEach((card) => {
        const isVisible =
          card.dataset.tag === selected || selected === "Все услуги";
        card.classList.toggle("service-card--hidden", !isVisible);
      });
    });
  });
}

export { initFilters };
