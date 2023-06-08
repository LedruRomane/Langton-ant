// Charger le module WebAssembly
const modulePromise = WebAssembly.instantiateStreaming(fetch('ant.wasm'));

// Elements DOM
const gridElement = document.querySelector('.grid');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('resetBtn');

// Variables de la simulation
let running = false;
let animationFrameId;
let imageDataPtr;
let imageDataArray;
let imageWidth;
let imageHeight;
let intervalId;

// Fonction pour démarrer la simulation
function startSimulation() {
  if (running) return;
  running = true;
  antModuleInstance.exports.init();

  intervalId = setInterval(() => {
    antModuleInstance.exports.move();
    updateGrid();
  }, 1000);
}

// Fonction pour arrêter la simulation
function stopSimulation() {
  running = false;
  clearInterval(intervalId);
}

// Fonction pour réinitialiser la grille
function resetGrid() {
  stopSimulation();
  antModuleInstance.exports.init();
  updateGrid();
}

// Fonction pour mettre à jour la grille à partir des données de l'image
function updateGrid() {
  const data = new Uint8Array(antModuleInstance.exports.get_image_size());
  const dataPtr = antModuleInstance.exports.get_image_address();
  data.set(new Uint8Array(antModuleInstance.exports.memory.buffer, dataPtr, data.length));

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

// Attacher les gestionnaires d'événements aux boutons
startButton.addEventListener('click', startSimulation);
stopButton.addEventListener('click', stopSimulation);
resetButton.addEventListener('click', resetGrid);

// Charger et initialiser le module WebAssembly
let antModuleInstance;
modulePromise.then(module => {
  antModuleInstance = module.instance;
  imageDataPtr = antModuleInstance.exports.get_image_address();
  imageDataArray = new Uint8Array(antModuleInstance.exports.memory.buffer, imageDataPtr, antModuleInstance.exports.get_image_size());
  imageWidth = antModuleInstance.exports.get_image_width();
  imageHeight = antModuleInstance.exports.get_image_height();

  // Créer les cellules de la grille
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gridElement.appendChild(cell);
    }
  }

  // Initialiser la grille
  resetGrid();
});