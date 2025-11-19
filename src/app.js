(function () {
    const controls = document.querySelectorAll(".control");
    const themeBtn = document.querySelector(".theme-btn");
    const body = document.body;

    /* ============================
       SECTION SWITCHING (fixed)
    ============================ */
    controls.forEach(button => {
        button.addEventListener("click", function () {
            const currentActiveBtn = document.querySelector(".active-btn");
            const currentActiveSection = document.querySelector(".container.active");
            const targetId = this.dataset.id;
            const targetSection = document.getElementById(targetId);

            if (currentActiveBtn) currentActiveBtn.classList.remove("active-btn");
            this.classList.add("active-btn");

            if (currentActiveSection) currentActiveSection.classList.remove("active");
            if (targetSection) targetSection.classList.add("active");
        });
    });

    /* ============================
       THEME SWITCH
    ============================ */
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
        });
    }

    /* ============================
       REVEAL ON SCROLL
    ============================ */
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("reveal-visible"));
    }

    /* ============================
       PORTFOLIO MODAL (UPDATED)
    ============================ */
    const modal = document.getElementById("portfolio-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image"); // NEW
    const modalCloseBtn = document.getElementById("portfolio-modal-close");
    const modalOverlay = modal ? modal.querySelector(".portfolio-modal-overlay") : null;
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    function openModal(title, description, imagePath) {
        if (!modal) return;

        modalTitle.textContent = title;

        // ⭐ ONLY SkyStream project shows AWS image
        if (imagePath) {
            modalImage.src = imagePath;
            modalImage.style.display = "block";
        } else {
            modalImage.style.display = "none";
        }

        modalDescription.textContent = description;
        modal.classList.add("open");
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("open");
    }

    portfolioItems.forEach(item => {
        item.addEventListener("click", (e) => {

            // Prevent modal opening when clicking on GitHub / YouTube / View Project
            if (e.target.closest("a")) return;

            const title = item.dataset.modalTitle || item.querySelector("h4")?.textContent;
            const description = item.dataset.modalDescription || item.querySelector(".portfolio-text p")?.textContent;

            // ⭐ Show AWS image ONLY for SkyStream
            const imagePath = item.id === "skystream-card" ? "src/img/aws_cloud.webp" : null;

            openModal(title, description, imagePath);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });

    /* ============================
       EMAILJS FORM HANDLER
    ============================ */
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (typeof emailjs !== "undefined") {
        emailjs.init("YOUR_PUBLIC_KEY_HERE");
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (typeof emailjs === "undefined") {
                if (formStatus) {
                    formStatus.textContent = "Email service not configured yet.";
                    formStatus.style.color = "orange";
                }
                return;
            }

            formStatus.textContent = "Sending message...";
            formStatus.style.color = "var(--color-grey-1)";

            emailjs
                .sendForm("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", "#contact-form")
                .then(
                    () => {
                        contactForm.reset();
                        formStatus.textContent = "Message sent successfully! ✅";
                        formStatus.style.color = "lightgreen";
                    },
                    () => {
                        formStatus.textContent = "Something went wrong. Please try again.";
                        formStatus.style.color = "tomato";
                    }
                );
        });
    }
})();

