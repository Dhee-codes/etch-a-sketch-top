const sketchPad = document.querySelector(".sketch-pad");
const option = document.querySelectorAll("option");

function getPadLayout() {
    let layout = option.value;
    return layout;
}

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const grid = document.createElement("div");
        grid.classList.add("pixel");
        sketchPad.append(grid);
    }
}

let isMouseDown = false;

sketchPad.addEventListener("mousedown", () => isMouseDown = true);
sketchPad.addEventListener("mouseup", () => isMouseDown = false);

const pixels = document.querySelectorAll(".pixel");

pixels.forEach(pixel => {
  pixel.addEventListener("mouseenter", () => {
    if (isMouseDown) pixel.style.backgroundColor = "blue";
  });
});


console.log(getPadLayout());