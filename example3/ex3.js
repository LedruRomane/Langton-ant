async function main() {
  let result = await WebAssembly.instantiateStreaming(
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

  function toUpper(txt) {
    // transfère txt dans le buffer, caractère par caractère
    for (let i=0; i<txt.length; i++) {
      buf_str[i] = txt.charCodeAt(i);
    }

    // appelle la fonction WebAssembly pour passer buffer en majuscules
    upper(txt.length);

    // extrait et affiche les caractères du buffer
    let ret = "";
    for (let i=0; i<txt.length; i++) {
      ret += String.fromCharCode(buf_str[i]);
    }
    return ret;
  }

  let i = document.querySelector("input");
  let c = document.getElementById("container");

  i.addEventListener('input', () => {
    c.innerText = toUpper(i.value);
  });
}

main();
