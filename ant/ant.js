const modulePromise = WebAssembly.instantiateStreaming(fetch('ant.wasm'));

const gridElement = document.querySelector('.grid');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('resetBtn');

let running = false;
let animationFrameId;
let imageDataPtr;
let imageDataArray;
let imageWidth;
let imageHeight;
let intervalId;

function start() {
  if (running) {
    resetGrid();
  };
  running = true;
  antModuleInstance.exports.init();

  intervalId = setInterval(() => {
    if (antModuleInstance.exports.move()) {
      updateGrid();
      return;
    }
    
    stop();
  }, 10);
}

function stop() {
  running = false;
  clearInterval(intervalId);
}

function resetGrid() {
  stop();
  antModuleInstance.exports.init();
  updateGrid();
}

// Fonction pour mettre à jour la grille.
function updateGrid() {
  const data = new Uint8Array(antModuleInstance.exports.get_image_size());
  const dataPtr = antModuleInstance.exports.get_image_address();
  data.set(new Uint8Array(antModuleInstance.exports.memory.buffer, dataPtr, data.length));

  // Ajoute une cell noire ou la retire (et donc devient blanche).
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const index = (y * imageWidth + x) * 4;
      const cell = gridElement.children[y * imageWidth + x];
      if (data[index] === 0) {
        cell.classList.add('black');
      } else {
        cell.classList.remove('black');
      }
    }
  }
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

// Charger et initialiser WebAssembly
let antModuleInstance;
modulePromise.then(module => {
  antModuleInstance = module.instance;
  imageDataPtr = antModuleInstance.exports.get_image_address();
  imageDataArray = new Uint8Array(antModuleInstance.exports.memory.buffer, imageDataPtr, antModuleInstance.exports.get_image_size());
  imageWidth = antModuleInstance.exports.get_image_width();
  imageHeight = antModuleInstance.exports.get_image_height();

  // Création des cellules de la grille.
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gridElement.appendChild(cell);
    }
  }
  
  resetGrid();
});