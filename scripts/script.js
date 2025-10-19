const sketchPad = document.querySelector(".sketch-pad");
const generateBtn = document.querySelector("#generate");
const sizeInput = document.querySelector("#size");

function generatePadLayout() {
  const defaultSize = 16;
  let userSize = parseInt(sizeInput.value, 10);

  const padSize = (!isNaN(userSize) && userSize > 0) ? userSize : defaultSize;

  // Clear previous pixels
  sketchPad.innerHTML = "";

  for (let i = 0; i < padSize * padSize; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.flexBasis = `calc(100% / ${padSize})`;
    sketchPad.appendChild(pixel);
  }
  
  sketch();
}

function sketch() {
  let isMouseDown = false;

  sketchPad.addEventListener("mousedown", () => isMouseDown = true);
  sketchPad.addEventListener("mouseup", () => isMouseDown = false);
  const pixels = document.querySelectorAll(".pixel")

  pixels.forEach( pixel => {
    pixel.addEventListener('mouseenter', () => {
      if (isMouseDown) pixel.style.backgroundColor = "blue";
    });
  });
}

document.addEventListener("DOMContentLoaded", generatePadLayout);
generateBtn.addEventListener('click', generatePadLayout);