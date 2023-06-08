#define WASM_EXPORT __attribute__((visibility("default")))

#define SIZE 256
char BUF_STR[SIZE];

WASM_EXPORT
char* get_buf_str_address(void) {
  return &BUF_STR[0];
  // NB: les pointeurs sont vus par WASM/Javascript comme des entiers
}

WASM_EXPORT
int get_buf_str_size(void) {
  return sizeof(BUF_STR);
}

// met le contenu de BUF_STR en majuscules
WASM_EXPORT
void upper(int len) {
  for (int i=0; i<len; i++) {
    if ('a' <= BUF_STR[i] && BUF_STR[i] <= 'z') {
      BUF_STR[i] -= 32;
    }
  }
}
