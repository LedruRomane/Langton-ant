async function main() {

  // charge le module WASM
  let result = await WebAssembly.instantiateStreaming(
    fetch('./ex4.wasm'),
    {},
  );
  let {
      memory,
      get_image_address,
      get_image_height,
      get_image_size,
      get_image_width,
      fill,
  } = result.instance.exports;

  // génère le contenu de l'image
  fill();

  // récupère le buffer image pour Javascript
  let image = new Uint8ClampedArray(
    memory.buffer,
    get_image_address(),
    get_image_size(),
  );

  // adapte la taille du canvas
  let c = document.querySelector("canvas");
  c.width = get_image_width();
  c.height = get_image_height();

  // affiche le contenu du buffer image dans le canvas
  imageData = new ImageData(image, c.width, c.height);
  let ctx = c.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
}

main();
