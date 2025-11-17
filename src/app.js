(function () {
    const controls = document.querySelectorAll(".control");
    const themeBtn = document.querySelector(".theme-btn");
    const body = document.body;

    // Section switching
    controls.forEach(button => {
        button.addEventListener("click", function () {
            const currentActiveBtn = document.querySelector(".active-btn");
            const currentActiveSection = document.querySelector(".active");
            const targetId = this.dataset.id;
            const targetSection = document.getElementById(targetId);

            // Safety checks
            if (currentActiveBtn) currentActiveBtn.classList.remove("active-btn");
            this.classList.add("active-btn");

            if (currentActiveSection) currentActiveSection.classList.remove("active");
            if (targetSection) targetSection.classList.add("active");
        });
    });

    // Theme toggle (dark / light mode)
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
        });
    }
})();
