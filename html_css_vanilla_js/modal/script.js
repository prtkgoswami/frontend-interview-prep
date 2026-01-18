document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Ready")

    const body = document.querySelector('body');
    const modalTrigger = document.querySelector('#modal-trigger')
    const modal = document.querySelector('#modal-wrapper');
    const modalContent = modal.querySelector("#modal-content");
    const modalCloseBtn = modal.querySelector('#modal-close-btn');
    const modalOverlay = modal.querySelector('#modal-overlay');
    let isModalOpen = false;

    function openModal() {
        isModalOpen = true;
        modal.classList.add("show")
        modal.setAttribute("aria-hidden", false);
        body.style.overflow = "hidden";
        modal.focus();
    }

    function closeModal() {
        isModalOpen = false;
        modal.classList.remove("show")
        modal.setAttribute("aria-hidden", true);
        body.style.overflow = "auto";
        modalTrigger.focus();
    }

    modalTrigger.addEventListener("click", openModal);
    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    modalContent.addEventListener("click", function (event) {
        event.stopPropagation();
    })
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isModalOpen) {
            closeModal();
        }
    })
})