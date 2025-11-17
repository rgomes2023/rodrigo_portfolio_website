/* ============================================================
   VPC BUILDER – LOGIC
   Drag, drop, connect, and export
============================================================ */

const canvas = document.getElementById("canvas");
const lineCanvas = document.getElementById("connection-lines");
const ctx = lineCanvas.getContext("2d");

lineCanvas.width = canvas.offsetWidth;
lineCanvas.height = canvas.offsetHeight;

let dragging = null;
let offsetX = 0;
let offsetY = 0;

let items = [];
let connections = [];

/* ============================================================
   DRAG FROM SIDEBAR TO CANVAS
============================================================ */
document.querySelectorAll(".tool-item").forEach(el => {
    el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("type", el.dataset.type);
    });
});

canvas.addEventListener("dragover", (e) => e.preventDefault());

canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");

    addAwsItem(type, e.offsetX, e.offsetY);
});

/* ============================================================
   ADD COMPONENT TO CANVAS
============================================================ */
function addAwsItem(type, x, y) {
    const div = document.createElement("div");
    div.classList.add("aws-item");

    div.innerHTML = `
        <img src="img/aws-icons/${type}.png">
        <p>${type.toUpperCase()}</p>
    `;

    div.style.left = x + "px";
    div.style.top = y + "px";

    canvas.appendChild(div);
    items.push(div);

    makeDraggable(div);
    setupConnection(div);
}

/* ============================================================
   DRAG WITH SNAP-TO-GRID
============================================================ */
function makeDraggable(el) {
    el.addEventListener("mousedown", (e) => {
        dragging = el;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        el.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        let newX = e.pageX - canvas.offsetLeft - offsetX;
        let newY = e.pageY - canvas.offsetTop - offsetY;

        // SNAP TO GRID (25px)
        newX = Math.round(newX / 25) * 25;
        newY = Math.round(newY / 25) * 25;

        dragging.style.left = `${newX}px`;
        dragging.style.top = `${newY}px`;

        drawConnections();
    });

    window.addEventListener("mouseup", () => {
        if (dragging) dragging.style.cursor = "grab";
        dragging = null;
    });
}

/* ============================================================
   CONNECT ITEMS
============================================================ */
function setupConnection(el) {
    el.addEventListener("dblclick", () => {
        if (connections.length % 2 === 0) {
            connections.push(el);
        } else {
            connections.push(el);
            drawConnections();
        }
    });
}

function drawConnections() {
    ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

    for (let i = 0; i < connections.length; i += 2) {
        const a = connections[i];
        const b = connections[i + 1];
        if (!a || !b) continue;

        const ax = a.offsetLeft + 40;
        const ay = a.offsetTop + 40;
        const bx = b.offsetLeft + 40;
        const by = b.offsetTop + 40;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = "#0066cc";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

/* ============================================================
   EXPORT PNG
============================================================ */
document.getElementById("export-btn").addEventListener("click", () => {
    html2canvas(canvas).then((canvasExport) => {
        const link = document.createElement("a");
        link.download = "vpc-design.png";
        link.href = canvasExport.toDataURL();
        link.click();
    });
});
