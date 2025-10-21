# Etch-A-Sketch

A browser-based sketch pad built with **vanilla JavaScript, HTML, and CSS**.  
Users can draw by hovering over a grid, toggle eraser mode, clear the pad, and manage custom color palettes.

---

## Features

- **Dynamic grid generation** — create any size of sketch pad (default: 16×16).  
- **Click-and-drag drawing** — draw while holding the mouse button.  
- **Eraser toggle** — switch between drawing and erasing.  
- **Grid line toggle** — show or hide pixel borders for a cleaner look.  
- **Clear button** — reset the pad instantly.  
- **Color palette system**
  - Editable color pots  
  - Multi-color (random) mode  
  - Custom color picker via native input  
  - Contextual menu with *Use*, *Change*, *Empty* actions  

---

## Tech Stack

| Layer | Tools |
|-------|--------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Architecture** | Modular DOM manipulation + event delegation |
| **UI Logic** | Dynamic node creation, state-driven interactivity |

---

## How It Works

| Concept | Description |
|----------|-------------|
| **Dynamic Pad** | JavaScript generates pixel `<div>` elements inside `.sketch-pad` depending on user input. Each pixel reacts to hover events only when `mousedown` is active. |
| **State Management** | Flags like `isMouseDown`, `isEraser`, and `showGrid` control global UI behavior. A `paletteState` object tracks active colors. |
| **Event Delegation** | Global listeners (`mousedown`, `mouseup`, `mouseleave`) ensure consistent drawing logic. Button listeners stay persistent to avoid re-binding issues. |
| **Palette Menu** | Uses DOM-positioned contextual menus (`.color-menu`) to handle per-pot actions. |

---

## Lessons Applied

- Rebuilding grids requires re-binding only pixel-specific events.  
- Avoid nesting persistent event listeners inside dynamic functions (e.g., `sketch()`).  
- Always handle `mouseleave` on the drawing surface to prevent sticky mouse states.  
- Use state objects for global UI state instead of excessive flags.  
- CSS `flex-basis` scaling simplifies grid sizing.  

---

## Setup

### Clone and run
```bash
git clone https://github.com/<your-username>/etch-a-sketch-top.git
cd etch-a-sketch-top
```

Then open index.html in your browser.

No build tools. No dependencies. Pure front-end logic.

---

## File Structure

```
etch-a-sketch/
│
├── images/
│   └── multicolor.jpg
│
├── scripts/
│   └── scripts.js
│
├── styles/
│   └── style.css
│
├── .gitignore
├── index.html
├── LICENSE
└── README.md

```

## Author

**Dhee-codes**

---

## License

This project is licensed under the MIT License — free to use, modify, and distribute.