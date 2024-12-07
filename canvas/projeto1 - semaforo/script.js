const canvas = document.getElementById("semaforoCanvas");
const ctx = canvas.getContext("2d");

// Dimensões do semáforo
const width = 100;
const height = 300;
const xPos = (canvas.width - width) / 2;
const yPos = 50;

// Corpo do semáforo
ctx.fillStyle = "black";
ctx.fillRect(xPos, yPos, width, height);

// Coordenadas das luzes
const lightRadius = 30;
const lightX = canvas.width / 2;
const lightsY = [90, 190, 290];

// Função para desenhar uma luz
function drawLight(y, color) {
    ctx.beginPath();
    ctx.arc(lightX, y, lightRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Luzes apagadas inicialmente
lightsY.forEach(y => drawLight(y, "gray"));

// Alternância das luzes
let currentLight = 0;
const lightColors = ["red", "yellow", "green"];

function updateTrafficLight() {
    lightsY.forEach(y => drawLight(y, "gray")); // Apagar todas as luzes
    drawLight(lightsY[currentLight], lightColors[currentLight]); // Acender luz atual
    currentLight = (currentLight + 1) % lightColors.length; // Alternar luz
}

// Alternar as luzes a cada 2 segundos
setInterval(updateTrafficLight, 2000);