'use strict';

let gElCanvas;
let gCtx;
const PADDING = 10;
let gIsEditor = false;

function onInit() {
  window.addEventListener('resize', () => {
    if (!gElCanvas || !gIsEditor) return;
    resizeCanvas();
    renderMeme();
  });

  renderImgs();
  showSection(gIsEditor);
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onMouseDown);
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mouseup', onMouseUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onMouseDown);
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchend', onMouseUp);
}

function resizeCanvas() {
  if (!gElCanvas) return;
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
}

function showSection(isEditor) {
  const elGrid = document.querySelector('.grid-container');
  const elEditor = document.querySelector('.editor-container');

  elGrid.classList.toggle('hidden', isEditor);
  elEditor.classList.toggle('hidden', !isEditor);
}

function onChangeSection() {
  const el = document.querySelector('.list-reset');
  gIsEditor = !gIsEditor;
  el.innerText = gIsEditor ? 'Gallery' : 'Editor';

  showSection(gIsEditor);

  if (gIsEditor) {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    gElCanvas.style.cursor = 'grab';
    addListeners();
    resizeCanvas();
    editMeme();
    renderMeme();
  }
}
