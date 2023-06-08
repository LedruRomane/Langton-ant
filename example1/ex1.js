async function main() {
  // chargement du module WASM
  let result = await WebAssembly.instantiateStreaming(
    fetch('./ex1.wasm'),
    {},
  );
  let {answer} = result.instance.exports;

  let c = document.getElementById("container");
  c.textContent = answer();
}

main();
