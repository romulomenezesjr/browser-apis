## Tutorial: Criando uma Animação Interativa com Bolas em Movimento usando JavaScript

Neste tutorial, vamos desenvolver um projeto de animação no navegador onde diversas bolas coloridas se movem e colidem, mudando de cor. Além disso, teremos uma bola controlável que você pode mover usando as setas do teclado.

---

### 1. Configuração Inicial
Comece criando um arquivo HTML e um arquivo JavaScript para o projeto. O HTML irá definir o espaço do canvas, e o JavaScript será responsável por desenhar e animar as bolas.

---

### 2. Estrutura HTML
Crie um arquivo `index.html` com o seguinte conteúdo:
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bolas em Movimento</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <canvas></canvas>
  <script src="script.js"></script>
</body>
</html>
```
**Explicação**:
- A tag `<canvas>` cria uma área para desenharmos as bolas.
- O JavaScript será vinculado no arquivo `script.js`.

---

### 3. Configurando o Canvas no JavaScript
Crie um arquivo `script.js` e adicione o seguinte código para configurar o canvas:
```javascript
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
```
**Explicação**:
- Ajustamos o canvas para preencher toda a janela.
- `ctx` é o contexto de desenho 2D.

---

### 4. Criando Funções Auxiliares
- **Função para gerar números aleatórios**:
  ```javascript
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  ```
- **Função para gerar cores aleatórias**:
  ```javascript
  function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  }
  ```

---

### 5. Definindo a Classe `Ball`
```javascript
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
```
**Explicação**:
- `Ball` é uma classe que representa uma bola com propriedades de posição, velocidade, cor e tamanho.
- `draw()` desenha a bola no canvas.
- `update()` move a bola e faz com que ela mude de direção ao bater nas bordas.
- `collisionDetect()` verifica colisões e muda a cor da bola ao colidir.

---

### 6. Criando a Classe `Player`
```javascript
class Player extends Ball {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY, color, size);
    this.acceleration = 1.5;
    this.friction = 0.95;
    this.maxSpeed = 7;
  }

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
    this.velX = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velX));
    this.velY = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velY));
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;
    this.velX *= this.friction;
    this.velY *= this.friction;

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
```
**Explicação**:
- `Player` herda de `Ball` e adiciona aceleração, fricção e controle de velocidade máxima.
- `handleInput()` controla a movimentação com as setas do teclado.
- `update()` aplica a movimentação suave e garante que o jogador não saia do canvas.

---

### 7. Inicializando as Bolas e o Jogador
```javascript
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
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
```
**Explicação**:
- Cria um array `balls` com 25 bolas aleatórias.
- Cria um jogador que você pode controlar.

---

### 8. Criando o Loop de Animação
```javascript
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  player.draw();
  player.update();

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
```
**Explicação**:
- `loop()` redesenha o canvas continuamente, criando a animação.
- `requestAnimationFrame()` mantém a animação suave.

---

### 9. Detectando Teclas do Teclado
```javascript
document.onkeydown = function (e) {
  player.handleInput(e.key);
};
```
**Explicação**:
- `onkeydown` detecta quando uma tecla de seta é pressionada e move o jogador.

---

### Pronto!
Agora você tem uma animação interativa com bolas que colidem e uma bola controlável pelo teclado. Experimente ajustar os valores de aceleração, fricção e velocidade para personalizar o movimento!