'use strict';

var gElCanvas;
var gCtx;

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.clientWidth;
}

function renderImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function renderMeme() {
  const meme = getMeme();
  const img = new Image();
  img.src = `imgs/${meme.selectedImgId}.jpg`;
  img.onload = () => {
    renderImg(img);
    drawText(meme.lines);
  };
}

function onSetText(el) {
  setLineTxt(el.value);
  renderMeme();
}

function onSetFont(font) {
  setFont(font);
  renderMeme();
}

function onSetFontSize(diff) {
  setFontSize(diff);
  renderMeme();
}

function onSetStrokeColor(color) {
  setStroke(color);
  renderMeme();
}

function onSetFillColor(color) {
  setFill(color);
  renderMeme();
}

function onAlign(direction) {
  setAlign(direction);
  renderMeme();
}

function onAdd() {
  addLine();
  setInputValue();
  renderMeme();
}

function onSwitchLine() {
  switchLine();
  setInputValue();
  renderMeme();
}

function onRemoveLine() {
  removeLine();
  setInputValue();
  renderMeme();
}

function drawText(lines) {
  if (lines.length === 0) return;

  lines.forEach((line, idx) => {
    let x = line.pos.x;
    let y = line.pos.y;

    let rectX;

    gCtx.lineWidth = 3;
    gCtx.baseLine = 'top';

    gCtx.fillStyle = line.color || 'white';
    gCtx.strokeStyle = line.stroke || 'black';

    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align || 'center';

    const padding = 10;

    const metrics = gCtx.measureText(line.txt);
    const width = metrics.width;

    if (line.align === 'left') {
      x = padding;
      rectX = x;
    } else if (line.align === 'right') {
      x = gElCanvas.width - padding;
      rectX = x - width;
    } else {
      x = gElCanvas.width / 2;
      rectX = x - width / 2;
    }

    if (y === 0) {
      y += padding + line.size;
    }

    if (idx === gMeme.selectedLineIdx) {
      gCtx.save();
      gCtx.strokeStyle = 'yellow';
      gCtx.lineWidth = 2;
      gCtx.strokeRect(
        rectX - padding,
        y - line.size - padding,
        width + padding * 2,
        line.size + padding * 2,
      );
      gCtx.restore();
    }

    gCtx.strokeText(line.txt, x, y);
    gCtx.fillText(line.txt, x, y);
  });
}

function downloadCanvas(elLink) {
  elLink.download = gMeme.selectedImgId; // Set a name for the downloaded file

  const dataUrl = gElCanvas.toDataURL();
  elLink.href = dataUrl;
}
