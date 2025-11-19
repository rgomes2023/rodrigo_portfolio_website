(function () {
    const controls = document.querySelectorAll(".control");
    const themeBtn = document.querySelector(".theme-btn");
    const body = document.body;

    // ========= SECTION SWITCHING =========
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

    // ========= THEME TOGGLE =========
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
        });
    }

    // ========= REVEAL ON SCROLL =========
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

    // ========= PORTFOLIO MODAL =========
    const modal = document.getElementById("portfolio-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image");
    const modalCloseBtn = document.getElementById("portfolio-modal-close");
    const modalOverlay = modal ? modal.querySelector(".portfolio-modal-overlay") : null;
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    function openModal(title, description, imageSrc) {
        if (!modal) return;

        modalTitle.textContent = title || "";
        modalDescription.textContent = description || "";

        if (modalImage) {
            if (imageSrc) {
                modalImage.src = imageSrc;
                modalImage.style.display = "block";
            } else {
                modalImage.src = "";
                modalImage.style.display = "none";
            }
        }

        modal.classList.add("open");
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("open");
    }

    portfolioItems.forEach(item => {
        item.addEventListener("click", (e) => {
            // Avoid triggering when clicking direct links (GitHub/YouTube/View Project)
            const isIconClick = e.target.closest("a");
            if (isIconClick) return;

            const title = item.dataset.modalTitle || item.querySelector("h4")?.textContent || "";
            const description =
                item.dataset.modalDescription ||
                item.querySelector(".portfolio-text p")?.textContent ||
                "";
            const imageSrc = item.dataset.modalImage || "";

            openModal(title, description, imageSrc);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeModal);
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // ========= EMAILJS CONTACT FORM =========
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (typeof emailjs !== "undefined") {
        // Replace with your EmailJS Public Key if you want it working
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

            if (formStatus) {
                formStatus.textContent = "Sending message...";
                formStatus.style.color = "var(--color-grey-1)";
            }

            // Replace SERVICE_ID and TEMPLATE_ID with your EmailJS IDs
            emailjs
                .sendForm("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", "#contact-form")
                .then(
                    () => {
                        contactForm.reset();
                        if (formStatus) {
                            formStatus.textContent = "Message sent successfully! ✅";
                            formStatus.style.color = "lightgreen";
                        }
                    },
                    (error) => {
                        console.error("EmailJS error:", error);
                        if (formStatus) {
                            formStatus.textContent = "Something went wrong. Please try again.";
                            formStatus.style.color = "tomato";
                        }
                    }
                );
        });
    }
})();




























