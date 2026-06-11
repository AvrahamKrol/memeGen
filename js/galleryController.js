'use strict';

let gIsEditor = false;

function onInit() {
  renderImgs();
  showSection(gIsEditor);
}

function renderImgs() {
  const elGrid = document.querySelector('.grid-container');
  const imgs = getImgs();
  const imgsHtml = imgs.map((img) => {
    return `
            <a href="#" onclick="onSelectImg(${img.id})">
              <img src="imgs/${img.id}.jpg" alt="image ${img.id}" />
            </a>
    `;
  });
  elGrid.innerHTML = imgsHtml.join('');
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
    resizeCanvas();
    renderMeme();
  }
}

function onSelectImg(imgId) {
  setImg(imgId);
  onChangeSection();
}
