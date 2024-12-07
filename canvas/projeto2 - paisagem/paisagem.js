const canvas = document.getElementById("paisagemCanvas");
const ctx = canvas.getContext("2d");

// Céu
ctx.fillStyle = "#87CEEB";
ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

// Montanhas
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(200, 100);
ctx.lineTo(350, 250);
ctx.closePath();
ctx.fillStyle = "#556B2F";
ctx.fill();

ctx.beginPath();
ctx.moveTo(300, 250);
ctx.lineTo(500, 50);
ctx.lineTo(700, 250);
ctx.closePath();
ctx.fillStyle = "#6B8E23";
ctx.fill();

// Sol
ctx.beginPath();
ctx.arc(650, 80, 50, 0, 2 * Math.PI);
ctx.fillStyle = "#FFD700";
ctx.fill();
ctx.strokeStyle = "#FFA500";
ctx.lineWidth = 5;
ctx.stroke();

// Casa
ctx.fillStyle = "#8B4513";
ctx.fillRect(150, 300, 200, 150);

ctx.beginPath();
ctx.moveTo(150, 300);
ctx.lineTo(250, 200);
ctx.lineTo(350, 300);
ctx.closePath();
ctx.fillStyle = "#A52A2A";
ctx.fill();

ctx.fillStyle = "#8B0000";
ctx.fillRect(280, 220, 20, 50);

ctx.fillStyle = "#D2691E";
ctx.fillRect(220, 370, 60, 80);

// Grama
ctx.fillStyle = "#228B22";
ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

// Janelas
ctx.fillStyle = "#87CEFA";
ctx.fillRect(180, 320, 40, 40);
ctx.fillRect(280, 320, 40, 40);

// Raios do Sol
for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const x1 = 650 + 50 * Math.cos(angle);
    const y1 = 80 + 50 * Math.sin(angle);
    const x2 = 650 + 80 * Math.cos(angle);
    const y2 = 80 + 80 * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.stroke();
}