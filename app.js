const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 캔버스는 css와 별도로 그림을 그릴 공간을 설정해주어야 한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;

let painting = false;
let modeFlag = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function fillBG() {
  if (modeFlag) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function onMouseMove(event) {
  // clientX, Y : 윈도우 전체의 좌표
  // offsetX, Y : canvas에서의 좌표
  const x = event.offsetX;
  const y = event.offsetY;
  if (!modeFlag) {
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeBtnClick(event) {
  if (!modeFlag) {
    modeFlag = true;
    event.target.innerText = "paint";
  } else {
    modeFlag = false;
    event.target.innerText = "fill";
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveBtnClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS😁";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillBG);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", handleModeBtnClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveBtnClick);
}
