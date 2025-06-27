const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let score = 0;
let running = true;

let cat = [{ x: 9 * box, y: 10 * box }];
let direction = null;

let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};

document.addEventListener("keydown", dir);

function dir(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
  else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function showMessage(msg, type = "info") {
  const box = document.getElementById("game-message");
  const text = document.getElementById("message-text");

  box.className = `visible ${type}`; 
  text.innerText = msg;
}


function restartGame() {
  cat = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  score = 0;
  running = true;
  document.getElementById("score").innerText = "Очки: 0";
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
  document.getElementById("game-message").className = "hidden";
}


function draw() {
  if (!running) return;

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 400, 400);

  for (let i = 0; i < cat.length; i++) {
    ctx.fillStyle = i === 0 ? "#ffa500" : "#ffcc80";
ctx.fillRect(cat[i].x, cat[i].y, box, box);


  }

  ctx.fillStyle = "#00ff00";
ctx.fillRect(food.x, food.y, box, box);



  let catX = cat[0].x;
  let catY = cat[0].y;

  if (direction === "LEFT") catX -= box;
  if (direction === "UP") catY -= box;
  if (direction === "RIGHT") catX += box;
  if (direction === "DOWN") catY += box;

  // ТП сквозь стены
  if (catX < 0) catX = canvas.width - box;
  if (catX >= canvas.width) catX = 0;
  if (catY < 0) catY = canvas.height - box;
  if (catY >= canvas.height) catY = 0;

  // Съел маслину
  if (catX === food.x && catY === food.y) {
    score++;
    document.getElementById("score").innerText = "Очки: " + score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    cat.pop();
  }

  const newHead = { x: catX, y: catY };

  // Врезался в себя
  for (let i = 1; i < cat.length; i++) {
    if (cat[i].x === newHead.x && cat[i].y === newHead.y) {
      running = false;
      showMessage("Вы проиграли! Котик остался голодным", "fail");
      return;
    }
  }

  // Победа
  if (score >= 20) {
    running = false;
    showMessage("Молодец! Персик сыт", "success");
    return;
  }

  cat.unshift(newHead);
}

setInterval(draw, 150);
