const sketchPad = document.querySelector(".sketch-pad");
const generateBtn = document.querySelector("#generate");
const sizeInput = document.querySelector("#size");
const gridLines = document.querySelector(".grid-lines");;
const eraser = document.querySelector(".eraser");;
const clearBtn = document.querySelector(".clear-pad");;
const layoutInd = document.querySelector(".layout");


let isMouseDown = false;

sketchPad.addEventListener("mousedown", () => isMouseDown = true);
sketchPad.addEventListener("mouseup", () => isMouseDown = false);

let isEraser = false;
let showGrid = true;

function generatePadLayout() {
  const defaultSize = 16;
  let userSize = parseInt(sizeInput.value, 10);

  const padSize = (!isNaN(userSize) && userSize > 0) ? userSize : defaultSize;

  sketchPad.innerHTML = "";
  sizeInput.value = "";
  layoutInd.textContent = `${padSize} x ${padSize}`;

  for (let i = 0; i < padSize * padSize; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel", "grid-lines");
    pixel.style.flexBasis = `calc(100% / ${padSize})`;
    sketchPad.appendChild(pixel);
  }
  
  sketch();
}

function sketch() {
  document.querySelectorAll(".pixel").forEach( pixel => {
    pixel.addEventListener('mouseenter', () => {
      if (!isMouseDown) return
      if (isEraser) pixel.style.backgroundColor = "";
      else pixel.style.backgroundColor = "blue";
    });
  });
}

function clearPad() {
  document.querySelectorAll(".pixel").forEach( pixel => {
    pixel.style.backgroundColor = ""; 
  });
}

function toggleGridLines() {
  showGrid = !showGrid;

  document.querySelectorAll(".pixel").forEach( pixel => {
    if (!showGrid) pixel.classList.remove("grid-lines");
    else pixel.classList.add("grid-lines");
  });
}

eraser.addEventListener('click', () => {
  isEraser = !isEraser;
  if (isEraser) eraser.classList.add("active-eraser");
  else eraser.classList.remove("active-eraser");
});

clearBtn.addEventListener('click', clearPad);

gridLines.addEventListener('click', toggleGridLines);

document.addEventListener("DOMContentLoaded", generatePadLayout);
generateBtn.addEventListener('click', generatePadLayout);