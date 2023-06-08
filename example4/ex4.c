#define WASM_EXPORT __attribute__((visibility("default")))

#define WIDTH 256
#define HEIGHT WIDTH
unsigned char IMAGE[HEIGHT][WIDTH][4];
const int R = 0;
const int G = 1;
const int B = 2;
const int A = 3;

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
// Génère un dégradé dans IMAGE
void fill(void) {
  for (int y=0; y<HEIGHT; y++) {
    for (int x=0; x<WIDTH; x++) {
      IMAGE[y][x][R] = x % 256;
      IMAGE[y][x][G] = x % 256;
      IMAGE[y][x][B] = x % 256;
      IMAGE[y][x][A] = 255;
    }
  }
}
