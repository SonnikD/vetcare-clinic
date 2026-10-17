function openModal(dialog) {
  dialog.showModal();
}

function closeModal(dialog) {
  dialog.close();
}

function initModal() {
  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    const dialog = document.getElementById(button.dataset.modalOpen);
    if (!dialog) return;
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      openModal(dialog);
    });
  });

  document.querySelectorAll(".modal").forEach((dialog) => {
    const closeButton = dialog.querySelector(".modal__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        closeModal(dialog);
      });
    }

    dialog.addEventListener("click", (evt) => {
      if (evt.target === dialog) {
        closeModal(dialog);
      }
    });
  });
}

export { initModal };
