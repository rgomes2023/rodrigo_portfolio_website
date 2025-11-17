/* ============================================
   AWS DIAGRAM VIEWER - INTERACTION LOGIC
============================================ */

const fileInput = document.getElementById("file-input");
const diagram = document.getElementById("diagram");
const wrapper = document.getElementById("canvas-wrapper");

let scale = 1;
let isDragging = false;
let startX, startY;

// Handle Upload
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        diagram.src = reader.result;
        diagram.style.display = "block";
        resetView();
    };
    reader.readAsDataURL(file);
});

/* ============================
   ZOOM CONTROLS
============================ */
document.getElementById("zoom-in").onclick = () => {
    scale += 0.1;
    updateTransform();
};

document.getElementById("zoom-out").onclick = () => {
    if (scale > 0.2) scale -= 0.1;
    updateTransform();
};

document.getElementById("reset").onclick = () => resetView();

/* ============================
   FULLSCREEN
============================ */
document.getElementById("fullscreen").onclick = () => {
    if (wrapper.requestFullscreen) wrapper.requestFullscreen();
};

/* ============================
   DRAG TO PAN
============================ */
diagram.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - diagram.offsetLeft;
    startY = e.clientY - diagram.offsetTop;
    diagram.style.cursor = "grabbing";
});

wrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    diagram.style.left = `${e.clientX - startX}px`;
    diagram.style.top = `${e.clientY - startY}px`;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    diagram.style.cursor = "grab";
});

/* ============================
   MOUSE WHEEL ZOOM
============================ */
wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    if (scale < 0.2) scale = 0.2;
    updateTransform();
});

/* ============================
   HELPERS
============================ */
function updateTransform() {
    diagram.style.transform = `scale(${scale})`;
}

function resetView() {
    scale = 1;
    diagram.style.left = "0px";
    diagram.style.top = "0px";
    updateTransform();
}
