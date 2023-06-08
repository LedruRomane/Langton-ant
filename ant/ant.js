async function main() {

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    let antModule;
    
    async function loadAntModule() {
      const response = await fetch('ant.wasm');
      const buffer = await response.arrayBuffer();
      const module = await WebAssembly.instantiate(buffer);
      antModule = module.instance.exports;
    
      antModule.init();
      requestAnimationFrame(runSimulation);
    }

    function drawImage() {
        const imageData = new ImageData(
          new Uint8ClampedArray(antModule.buffer, antModule.get_image_address(), antModule.get_image_size()),
          antModule.get_image_width(),
          antModule.get_image_height()
        );
      
        context.putImageData(imageData, 0, 0);
      }
    

      function runSimulation() {
        antModule.move();
        drawImage();
        requestAnimationFrame(runSimulation);
      }

    // function start() {
    //     console.log("start");
    //     antModule.init();
    //     window.intervalID = setInterval(() => {
    //         console.log("move");

    //         antModulemove();
    //         drawImage();
    //         requestAnimationFrame(runSimulation);
    //     }, 1000);
    // }

    function stop() {
        console.log("stop");
        clearInterval(window.intervalID);
    }

    function reset() {
        console.log("reset");
        stop();
        start();
    }

    document.getElementById("start").addEventListener("click", start);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("reset").addEventListener("click", reset);

    loadAntModule();
    
  }
  
  main();
  