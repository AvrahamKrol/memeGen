'use strict';

function onInit() {
  renderImgs();
}

function renderImgs() {
  const elGrid = document.querySelector('.grid-container');
  const imgs = getImgs();
  const imgsHtml = imgs.map((img) => {
    return `
            <a href="editor.html?imgId=${img.id}">
              <img src="imgs/${img.id}.jpg" alt="image ${img.id}" />
            </a>
    `;
  });
  elGrid.innerHTML = imgsHtml.join('');
}
