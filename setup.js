
const CANVAS = document.getElementById("main-canvas");
const CANVAS_CONTEXT = CANVAS.getContext("2d");

CANVAS.width = parseInt(window.getComputedStyle(document.querySelector("#main-canvas")).width);
CANVAS.height = parseInt(window.getComputedStyle(document.querySelector("#main-canvas")).height);

const MOUSE = {
  x: CANVAS.width / 2,
  y: CANVAS.height / 2
};

const COLORS = ["#2185C5", "#7ECEFD", "#FF7F66"];

document.addEventListener("mousemove", event => {
  MOUSE.x = event.clientX;
  MOUSE.y = event.clientY;
});

document.addEventListener("resize", () => {
  CANVAS.width = parseInt(window.getComputedStyle(document.querySelector("#main-canvas")).width);
  CANVAS.height = parseInt(window.getComputedStyle(document.querySelector("#main-canvas")).height);
});
