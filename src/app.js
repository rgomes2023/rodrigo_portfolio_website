/* ======================================================
   Rodrigo Gomes Portfolio - Fixed Navigation Logic
====================================================== */

const sections = document.querySelectorAll("[data-section]");
const controls = document.querySelectorAll(".control");
const body = document.body;

// Set HOME active on first load
document.getElementById("home").classList.add("active-section");

/* ======================================================
   1. NAVIGATION BUTTON CLICKS
====================================================== */
controls.forEach(control => {
    control.addEventListener("click", function () {

        // Update active button
        document.querySelector(".active-btn").classList.remove("active-btn");
        this.classList.add("active-btn");

        // Hide all sections
        sections.forEach(sec => sec.classList.remove("active-section"));

        // Show selected section
        const target = this.dataset.id;
        document.getElementById(target).classList.add("active-section");

        // Scroll to top of section
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

/* ======================================================
   2. THEME TOGGLE
====================================================== */
document.querySelector(".theme-btn").addEventListener("click", () => {
    body.classList.toggle("light-mode");
});



