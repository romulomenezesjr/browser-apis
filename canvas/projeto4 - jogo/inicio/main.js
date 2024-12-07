// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class Player extends Ball {
    constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY, color, size);
      this.acceleration = 1.5; // Fator de aceleração
      this.friction = 0.95; // Fator de desaceleração
      this.maxSpeed = 7; // Velocidade máxima
    }
  
    // Atualiza a velocidade com base na tecla pressionada e aplica aceleração/desaceleração
    handleInput(key) {
      switch (key) {
        case "ArrowLeft":
          this.velX -= this.acceleration;
          break;
        case "ArrowRight":
          this.velX += this.acceleration;
          break;
        case "ArrowUp":
          this.velY -= this.acceleration;
          break;
        case "ArrowDown":
          this.velY += this.acceleration;
          break;
      }
  
      // Limitar a velocidade máxima
      this.velX = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velX));
      this.velY = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velY));
    }
  
    // Atualiza a posição do jogador e aplica desaceleração
    update() {
      this.x += this.velX;
      this.y += this.velY;
  
      // Aplicar a fricção para desacelerar gradualmente
      this.velX *= this.friction;
      this.velY *= this.friction;
  
      // Garantir que o jogador não saia do canvas
      if (this.x + this.size > width) {
        this.x = width - this.size;
        this.velX = 0;
      }
      if (this.x - this.size < 0) {
        this.x = this.size;
        this.velX = 0;
      }
      if (this.y + this.size > height) {
        this.y = height - this.size;
        this.velY = 0;
      }
      if (this.y - this.size < 0) {
        this.y = this.size;
        this.velY = 0;
      }
    }
  }

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

const player = new Player(100, 100, 0, 0, randomRGB(), 20);

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    player.draw();
    player.update()
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();

document.onkeydown = function (e) {
  player.handleInput(e.key);
};
