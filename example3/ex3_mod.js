// jshint module:true

let result = await // jshint ignore: line
             WebAssembly.instantiateStreaming(
                 fetch('./ex3.wasm'),
                 {},
             );
let {
  memory,
  get_buf_str_address,
  get_buf_str_size,
  upper,
} = result.instance.exports;

let buf_str = new Uint8Array(
  memory.buffer,
  get_buf_str_address(),
  get_buf_str_size(),
);

export function toUpper(txt) {
  // transfère txt dans le buffer, caractère par caractère
  for (let j=0; j<txt.length; j++) {
    buf_str[j] = txt.charCodeAt(j);
  }

  // appelle la fonction WebAssembly pour passer buffer en majuscules
  upper(txt.length);

  // extrait et affiche les caractères du buffer
  let ret = "";
  for (let j=0; j<txt.length; j++) {
    ret += String.fromCharCode(buf_str[j]);
  }
  return ret;
}
