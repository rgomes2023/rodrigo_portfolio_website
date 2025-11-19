// ===== ACTIVE DOT INDICATOR ON SCROLL =====
const sections = document.querySelectorAll("section");
const dots = document.querySelectorAll("[href^='#']:not(nav a)");

function activateDot(id) {
    dots.forEach(dot => {
        if (dot.getAttribute("href") === `#${id}`) {
            dot.classList.add("bg-cyan-400");
            dot.classList.remove("bg-gray-500");
        } else {
            dot.classList.remove("bg-cyan-400");
            dot.classList.add("bg-gray-500");
        }
    });
}

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    if (current) activateDot(current);
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        }
    });
});



