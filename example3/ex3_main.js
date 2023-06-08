import {toUpper} from "./ex3_mod.js";

let i = document.querySelector("input");
let c = document.getElementById("container");

i.addEventListener('input', () => {
  c.innerText = toUpper(i.value);
});
