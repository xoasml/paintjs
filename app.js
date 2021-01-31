const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// 캔버스는 css와 별도로 그림을 그릴 공간을 설정해주어야 한다.
canvas.width = 700;
canvas.height = 700;

ctx.strokStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // clientX, Y : 윈도우 전체의 좌표
  // offsetX, Y : canvas에서의 좌표
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(evnet) {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
