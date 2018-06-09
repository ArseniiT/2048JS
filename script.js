
var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

var sizeInput = document.getElementById('size');
var    changeSize = document.getElementById('change-size');
var    scoreLabel = document.getElementById('score');

var   score = 0;
var   size  = 4;
var   gap   = 5;
var   width = (canvas.width - gap) / size - gap;

var   cells = [];
var   lost  = false;
var fontSize;

changeSize.onclick = function () {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = (canvas.width - gap) / size - gap;
    canvasClean();
    startGame();
  }
}

startGame();

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
}

function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + gap * (coll + 1);
  this.y = row * width + gap * (row + 1);
}

function createCells() {
  var i, j;
  for (i = 0; i < size; i++) {
    cells[i] = [];
    for (j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }    
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);

  switch (cell.value) {
    case 0: ctx.fillStyle='#cdc1b4'; break;
    case 2: ctx.fillStyle='#eee4da'; break;
    case 4: ctx.fillStyle='#ede0c8'; break;
    case 8: ctx.fillStyle='#f2b179'; break;
    case 16: ctx.fillStyle='#f59563'; break;
    case 32: ctx.fillStyle='#f67c5f'; break;
    case 64: ctx.fillStyle='#f65e3b'; break;
    case 128: ctx.fillStyle='#edcf72'; break;
    case 256: ctx.fillStyle='#edcc61'; break;
    case 512: ctx.fillStyle='#edc850'; break;
    case 1024: ctx.fillStyle='#edc53f'; break;
    case 2048: ctx.fillStyle='#edc22e'; break;
    case 4096: ctx.fillStyle='#9e8e5a'; break;
  
    default: ctx.fillStyle='#ff0000'; break;
  }

  ctx.fill();
  if (cell.value) {
    fontSize = width / 2.2;
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign='center';
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + fontSize/3);    
  }  
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!lost) {
    if        (event.keyCode === 38 || event.keyCode === 87) {
      moveUp(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft(); 
    }
    scoreLabel.innerHTML = 'Score : ' + score;
  }
}

function drawAllCells() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }  
}

function pasteNewCell() {
  while(true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}

function moveRight () {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = size - 2; j >= 0; j--) {
      if(cells[i][j].value) {
        coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveLeft() {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = 1; j < size; j++) {
      if(cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveUp() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = 1; i < size; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveDown() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = size - 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}
