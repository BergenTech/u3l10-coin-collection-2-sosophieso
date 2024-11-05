// Game variables 
let playerX, playerY;
let coinX, coinY;
let coinCollected = false;
let obstacleX, obstacleY;
let score = 0;
let hits = 0;
let speed = 3.5;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = 0;
  obstacleY = random(20, height-20);
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }
  
  // TODO: Add up/down movement
  // HINT: Use UP_ARROW and DOWN_ARROW keys
  // Movement should be 5 pixels per frame

  if (keyIsDown(UP_ARROW)) {
    playerY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += 5;
  }
}

function moveObstacle() {
  // TODO: Move obstacle from left to right
  // HINT: Increase obstacleX by obstacleSpeed
  
  // TODO: Reset obstacle when it goes off screen
  // HINT: Check if obstacleX > width
  // Reset to left side and new random Y position

  obstacleY += speed;
  if (obstacleY > height) {
    obstacleX = random(20, height - 20)
    obstacleY = 0
  }
}

function checkCoinCollection() {
  // TODO: Check if player touches coin
  // HINT: Use dist(playerX, playerY, coinX, coinY)
  // If distance < 15:
  //   - Increase score
  //   - Create new coin
  //   - Increase obstacle speed slightly

  if (dist(playerX, playerY, coinX, coinY) < 15 && !coinCollected) {
    coinCollected = true
    score ++
    speed += 0.5
    resetGame()
  }
}

function checkCollisions() {
  // TODO: Check if player hits obstacle
  // HINT: Similar to coin collection
  // If hit (distance < 20):
  //   - Increase hits
  //   - Check for game over (hits >= 3)
  //   - Reset positions

  if (dist(playerX, playerY, obstacleX, obstacleY) < 20) {
    hits ++
    resetGame()
  }

  if (hits >= 3) {
    gameOver = true;
    displayGameOver();
  }
}

function displayStats() {
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER)
  text("Score: " + score, 50, 20);

  // TODO: Add display for hits and speed
  text("Hits: " + hits, 200, 20);
  text("Speed: " + speed, 350, 20);
}

function displayGameOver() {
  // TODO: Show game over screen
  // HINT: Use textAlign(CENTER, CENTER)
  // Show:
  //   - "Game Over" message
  //   - Final score
  //   - "Press R to Restart"

  fill(0)
  textAlign(CENTER, CENTER)
  textSize(32)
  text("Game Over", width/2, height/2 - 20)
  textSize(16)
  text("Score: " + score, width/2, height/2 + 20)
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  // TODO: Reset all game variables
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()
  initializeGame()
}

function keyPressed() {
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}