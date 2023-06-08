
async function main() {
  let c = document.getElementById("container");

  // chargement du module WASM...
  let result = await WebAssembly.instantiateStreaming(
    fetch('./ex2.wasm'),
    {
      // ... en lui passant l'implémentations des fonctions 'extern'
      env: {
        print_int: (i) => { c.innerText += "" + i + "\n"; },
      }
    },
  );
  let {count} = result.instance.exports;

  count(5);
}

main();
