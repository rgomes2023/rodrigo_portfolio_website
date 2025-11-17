/* ======================================================
   Rodrigo Gomes Portfolio - Professional JS
   Smooth navigation • ScrollSpy • Fade-In • Theme Toggle
====================================================== */

// ========== DOM SHORTCUTS ==========
const sections = document.querySelectorAll("[data-section]");
const controls = document.querySelectorAll(".control");
const body = document.body;
const scrollTopBtn = document.getElementById("scroll-top");


// ======================================================
// 1. HANDLE NAVIGATION BUTTON CLICKS
// ======================================================
controls.forEach(control => {
    control.addEventListener("click", function () {
        // Remove current active button
        document.querySelector(".active-btn").classList.remove("active-btn");
        this.classList.add("active-btn");

        // Show the target section
        const target = this.dataset.id;
        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        document.getElementById(target).classList.add("active-section");

        // Scroll to top of section
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


// ======================================================
// 2. THEME TOGGLE (LIGHT <-> DARK)
// ======================================================
document.querySelector(".theme-btn").addEventListener("click", () => {
    body.classList.toggle("light-mode");
});


// ======================================================
// 3. FADE-IN SECTIONS WHEN THEY ENTER VIEWPORT
// ======================================================
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active-section");
            }
        });
    },
    { threshold: 0.15 }
);

// Observe each section
sections.forEach(section => observer.observe(section));


// ======================================================
// 4. SCROLLSPY (AUTO-HIGHLIGHT NAV BUTTON)
// ======================================================
window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            const id = section.getAttribute("id");

            controls.forEach(btn => btn.classList.remove("active-btn"));

            document
                .querySelector(`.control[data-id="${id}"]`)
                .classList.add("active-btn");
        }
    });

    // Show/hide scroll-top button
    if (window.scrollY > 450) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});


// ======================================================
// 5. SCROLL-TO-TOP BUTTON
// ======================================================
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ======================================================
// 6. INITIAL STATE: Set HOME active
// ======================================================
document.getElementById("home").classList.add("active-section");

