'use strict';

var gElCanvas;
var gCtx;

function onInit() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');

  resizeCanvas();
  renderMeme();
}

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
    drawText(meme.lines[0]);
  };
}

function onSetText(el) {
  console.log(el);
  setLineTxt(el.value);
  renderMeme();
}
