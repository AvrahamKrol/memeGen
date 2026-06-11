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
    drawText(meme.lines[meme.selectedLineIdx]);
  };
}

function onSetText(el) {
  setLineTxt(el.value);
  renderMeme();
}

function onSetFont(font) {
  console.log('font:', font);
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

function drawText(line) {
  gCtx.lineWidth = 4;
  gCtx.fillStyle = line.color || 'white';
  gCtx.strokeStyle = line.stroke || 'black';

  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'top';

  const x = gElCanvas.width / 2;
  const y = 20;

  gCtx.strokeText(line.txt, x, y);
  gCtx.fillText(line.txt, x, y);
}

function downloadCanvas(elLink) {
  elLink.download = gMeme.selectedImgId; // Set a name for the downloaded file

  const dataUrl = gElCanvas.toDataURL();
  elLink.href = dataUrl;
}
