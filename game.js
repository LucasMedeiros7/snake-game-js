const width = 400;
const height = 400;
const box = 32;

const snake = [];
snake.push({ x: 8 * box, y: 8 * box });

const fruit = {
  x: Math.floor(Math.random() * (width / box)) * box,
  y: Math.floor(Math.random() * (height / box)) * box,
};

let direction;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
document.addEventListener('keydown', updateDirection);

function createBG() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 16 * box, 16 * box);
}

function updateDirection(event) {
  console.log(event.key);
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function createFruit() {
  ctx.fillStyle = 'red';
  ctx.fillRect(fruit.x, fruit.y, box, box);
}

function checkCollision() {
  return snake[0].x === snake[i].x && snake[0].y === snake[i].y;
}

function moveSnakeEvent() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  return [snakeX, snakeY];
}

function startGame() {
  if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (checkCollision()) {
      clearInterval(game);
      alert('Game Over');
      window.location.reload();
    }
  }

  createBG();
  createSnake();
  createFruit();
  const [snakeX, snakeY] = moveSnakeEvent();

  if (snakeX != fruit.x || snakeY != fruit.y) {
    snake.pop();
  } else {
    fruit.x = Math.floor(Math.random() * 15 + 1) * box;
    fruit.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  const newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
