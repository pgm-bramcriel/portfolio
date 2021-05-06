// Creating canvas / context
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

// Dimensions
let h = 600;
let w = 700;
canvas.height = h;
canvas.width = w;

// Variables
const bgColor = "#0E0E0E";
const cubeColor = "#F57261";
let originalXSpeed = 0.05;
let speedX = 0.05;
let originalYSpeed = 0.20;
let speedY = 0.20;
let originalZSpeed = 0.10;
let speedZ = 0.10;

class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// Params
let cx = w / 2;
let cy = h / 2;
let cz = 0;
let size = h / 6;
let vertices = [
    new Point3D(cx - size, cy -size, cz - size),
    new Point3D(cx + size, cy - size, cz - size),
    new Point3D(cx + size, cy + size, cz - size),
    new Point3D(cx - size, cy + size, cz - size),
    new Point3D(cx - size, cy - size, cz + size),
    new Point3D(cx + size, cy - size, cz + size),
    new Point3D(cx + size, cy + size, cz + size),
    new Point3D(cx - size, cy + size, cz + size)
];

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7], // connecting sides
];

// Colors
ctx.fillStyle = bgColor;
ctx.strokeStyle = cubeColor;
ctx.lineWidth = w / 100;
ctx.lineCap = "round";

// Looping animation
let timeDelta, timeLast = 0;
requestAnimationFrame(loop);

function loop (timeNow) {
    timeDelta = timeNow  - timeLast;
    timeLast = timeNow;

    //bg
    ctx.fillRect(0, 0, w, h)

    // Rotate
    let angle = timeDelta & 0.001 & speedZ * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
    }

    angle = timeDelta * 0.001 * speedX * Math.PI * 2;
    for (let v of vertices) {
        let dy = v.y - cy;
        let dz = v.z - cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cy;
        v.z = z + cz;
    }

    angle = timeDelta * 0.001 * speedY * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dz = v.z - cz;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + cx;
        v.z = z + cz;
    }

    // Draw edges
    for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    requestAnimationFrame(loop);
}

document.addEventListener('mousemove', (e) => {
    let canvasPosition = canvas.getBoundingClientRect();
    
    if (e.clientX > canvasPosition.x && e.clientX < canvasPosition.x + canvas.width / 1.5 && e.clientY > canvasPosition.y && e.clientY < canvasPosition.y + canvas.height / 1.5) {
        speedX = 0.30;
        speedY = 0.50;
        speedZ = 0.70;
    } else {
        speedX = originalXSpeed;
        speedY = originalYSpeed;
        speedZ = originalZSpeed;
    }
})