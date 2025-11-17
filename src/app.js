(function () {
    // ===============================
    //  PAGE NAVIGATION BUTTONS
    // ===============================
    const controls = document.querySelectorAll(".control");
    const sections = document.querySelectorAll(".container");
    const body = document.querySelector(".main-content");

    controls.forEach(control => {
        control.addEventListener("click", function () {
            // Remove active button
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");

            // Remove active section
            document.querySelector(".active").classList.remove("active");

            // Add active to the correct section
            const sectionId = this.getAttribute("data-id");
            document.getElementById(sectionId).classList.add("active");
        });
    });

    // ===============================
    //  THEME SWITCH (Dark / Light)
    // ===============================
    const themeBtn = document.querySelector(".theme-btn");
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
    });

})();







