'use strict';

let gImgs = [
  { id: 1, url: 'imgs/1.jpg' },
  { id: 2, url: 'imgs/2.jpg' },
];

let gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      color: 'white',
      font: 'Montserrat',
      stroke: 'black',
      size: 20,
    },
  ],
};

function getMeme() {
  return gMeme;
}

function getImgs() {
  return gImgs;
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setInputValue() {
  const input = document.querySelector('input[type="text"]');
  input.value = gMeme.lines[0].txt;
}

function setFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = `${font}`;
}

function setFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function setFill(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setStroke(stroke) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = stroke;
}
