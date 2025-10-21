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

let defaultPot = null;

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
  document.querySelectorAll(".pixel").forEach(pixel => {
    pixel.addEventListener('mouseenter', () => {
      if (!isMouseDown) return;
      if (isEraser) {
        pixel.style.backgroundColor = "";
      } else if (paletteState.activeColor === "multi") {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        pixel.style.backgroundColor = `rgb(${r},${g},${b})`;
      } else {
        pixel.style.backgroundColor = paletteState.activeColor || defaultPot.dataset.color;
      }
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

const paletteState = {
  activePot: null,
  activeColor: null
};

const pots = document.querySelectorAll(".color-pot");
const menu = document.querySelector(".color-menu");
const colorInput = document.createElement("input");
colorInput.type = "color";
colorInput.style.display = "none";
document.body.appendChild(colorInput);

function setupPalette() {
  initPots();
  initMenu();
  initOutsideClick();
  initColorPicker();
}

function initPots() {
  pots.forEach(pot => {
    pot.addEventListener("click", (e) => {
      paletteState.activePot = e.currentTarget;
      showMenuAt(e.clientX, e.clientY);
    });
  });
}

function showMenuAt(x, y) {
  const menuRect = menu.getBoundingClientRect();
  const maxX = window.innerWidth - menuRect.width;
  const maxY = window.innerHeight - menuRect.height;

  menu.style.left = `${Math.min(x, maxX)}px`;
  menu.style.top = `${Math.min(y, maxY)}px`;

  menu.querySelectorAll("button").forEach(btn => {
    if (paletteState.activePot.classList.contains("multicolor")) {
      if (btn.dataset.action === "change" || btn.dataset.action === "empty") {
        btn.style.display = "none";
      } else {
        btn.style.display = "block";
      }
    } else if (paletteState.activePot.dataset.isDefault === "true") {
      if (btn.dataset.action === "empty") {
        btn.style.display = "none";
      } else {
        btn.style.display = "block";
      }
    } else {
      btn.style.display = "block";
    }
  });

  menu.style.display = "flex";
}

function initMenu() {
  menu.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = e.currentTarget.dataset.action;
      switch(action) {
        case "change":
          openColorPicker();
          break;
        case "empty":
          clearPot();
          break;
        case "use":
          selectActiveColor();
          break;
      }
      menu.style.display = "none";
    });
  });
}

function initOutsideClick() {
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== paletteState.activePot) {
      menu.style.display = "none";
    }
  });
}

function initColorPicker() {
  colorInput.addEventListener("input", (e) => {
    if (paletteState.activePot) {
      const color = e.target.value;
      paletteState.activePot.dataset.color = color;
      paletteState.activePot.style.backgroundColor = color;
      paletteState.activeColor = color;
    }
  });
}

function openColorPicker() {
  colorInput.click();
}

function clearPot() {
  if (!paletteState.activePot) return;

  if (paletteState.activePot.dataset.isDefault === "true") return;

  paletteState.activePot.dataset.color = "";
  paletteState.activePot.style.backgroundColor = "";

  if (paletteState.activePot.classList.contains("active")) {
    document.querySelectorAll(".color-pot.active").forEach(pot => pot.classList.remove("active"));

    defaultPot.classList.add("active");
    paletteState.activePot = defaultPot;
    paletteState.activeColor = defaultPot.dataset.color;
  }
}

function selectActiveColor() {
  if (!paletteState.activePot) return;

  const isEmpty = !paletteState.activePot.dataset.color && !paletteState.activePot.classList.contains("multicolor");
  if (isEmpty) return;

  document.querySelectorAll(".color-pot.active").forEach(pot => pot.classList.remove("active"));
  paletteState.activePot.classList.add("active");

  if (paletteState.activePot.classList.contains("multicolor")) {
    paletteState.activeColor = "multi";
  } else {
    paletteState.activeColor = paletteState.activePot.dataset.color;
  }
}

clearBtn.addEventListener('click', clearPad);

gridLines.addEventListener('click', toggleGridLines);

generateBtn.addEventListener('click', generatePadLayout);

document.addEventListener("DOMContentLoaded", () => {
  generatePadLayout();
  setupPalette();

  defaultPot = document.querySelector(".color-pot");
  defaultPot.dataset.isDefault = "true";
  defaultPot.dataset.color = "#000000";
  defaultPot.style.backgroundColor = "#000000";
  defaultPot.classList.add("active");

  paletteState.activePot = defaultPot;
  paletteState.activeColor = defaultPot.dataset.color;
});