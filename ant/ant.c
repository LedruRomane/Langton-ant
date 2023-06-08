#define WASM_EXPORT __attribute__((visibility("default")))

#define WIDTH 128
#define HEIGHT 128
unsigned char IMAGE[HEIGHT][WIDTH][4];
const int R = 0;
const int G = 1;
const int B = 2;
const int A = 3;
int antX = WIDTH / 2;
int antY = HEIGHT / 2;
int antOrientation = 0;

WASM_EXPORT
void* get_image_address(void) {
  return &IMAGE;
}

WASM_EXPORT
int get_image_width(void) {
  return WIDTH;
}

WASM_EXPORT
int get_image_height(void) {
  return HEIGHT;
}

WASM_EXPORT
int get_image_size(void) {
  return sizeof(IMAGE);
}

WASM_EXPORT
// Génère un cadriage dans IMAGE
void init(void) {
    for (int y = 0; y < HEIGHT; y++) {
    for (int x = 0; x < WIDTH; x++) {
      IMAGE[y][x][R] = 255;
      IMAGE[y][x][G] = 255;
      IMAGE[y][x][B] = 255;
      IMAGE[y][x][A] = 255;
    }
  }
}

WASM_EXPORT
// Setp d'une fourmi de Langton
void move(void) {
  int cellR = IMAGE[antY][antX][R];
  int cellG = IMAGE[antY][antX][G];
  int cellB = IMAGE[antY][antX][B];
  int cellA = IMAGE[antY][antX][A];

  // Change the color of the current cell
  IMAGE[antY][antX][R] = 0;
  IMAGE[antY][antX][G] = 0;
  IMAGE[antY][antX][B] = 0;
  IMAGE[antY][antX][A] = 255;

  // Update the ant's position and orientation based on the color of the current cell
  if (cellR == 0 && cellG == 0 && cellB == 0) {
    // Cell is black, turn right
    antOrientation = (antOrientation + 1) % 4;
  } else {
    // Cell is white, turn left
    antOrientation = (antOrientation + 3) % 4;
  }

  // Move the ant forward
  switch (antOrientation) {
    case 0:  // Up
      antY = (antY - 1 + HEIGHT) % HEIGHT;
      break;
    case 1:  // Right
      antX = (antX + 1) % WIDTH;
      break;
    case 2:  // Down
      antY = (antY + 1) % HEIGHT;
      break;
    case 3:  // Left
      antX = (antX - 1 + WIDTH) % WIDTH;
      break;
  }
}






