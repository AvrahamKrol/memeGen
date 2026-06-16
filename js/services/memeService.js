'use strict';

let gImgs = [
  { id: 1, url: 'imgs/1.jpg' },
  { id: 2, url: 'imgs/2.jpg' },
  { id: 3, url: 'imgs/3.jpg' },
  { id: 4, url: 'imgs/4.jpg' },
  { id: 5, url: 'imgs/5.jpg' },
  { id: 6, url: 'imgs/6.jpg' },
  { id: 7, url: 'imgs/7.jpg' },
  { id: 8, url: 'imgs/8.jpg' },
  { id: 9, url: 'imgs/9.jpg' },
  { id: 10, url: 'imgs/10.jpg' },
  { id: 11, url: 'imgs/11.jpg' },
  { id: 12, url: 'imgs/12.jpg' },
  { id: 13, url: 'imgs/13.jpg' },
  { id: 14, url: 'imgs/14.jpg' },
  { id: 15, url: 'imgs/15.jpg' },
  { id: 16, url: 'imgs/16.jpg' },
  { id: 17, url: 'imgs/17.jpg' },
  { id: 18, url: 'imgs/18.jpg' },
];

let gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      id: 0,
      txt: 'I sometimes eat Falafel',
      color: 'white',
      font: 'montserrat',
      stroke: 'black',
      align: 'center',
      size: 40,
      pos: { x: 0, y: 0 },
    },
    {
      id: 1,
      txt: 'I love nature',
      color: 'white',
      font: 'montserrat',
      stroke: 'black',
      align: 'center',
      size: 20,
      pos: { x: 0, y: 200 },
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
  if (gMeme.selectedLineIdx === -1) return;

  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
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

function setAlign(dir) {
  gMeme.lines[gMeme.selectedLineIdx].align = dir;
}

function addLine() {
  const txt =
    document.querySelector('input[type="text"]').value || 'Your text here';
  const x = getRandomInt(0, gElCanvas.width);
  const y = getRandomInt(0, gElCanvas.height);

  const newLine = _createLine(x, y, txt);
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function switchLine() {
  gMeme.selectedLineIdx++;

  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0;
  }
}

function removeLine() {
  if (gMeme.lines.length === 0) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);

  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  }
}

function editMeme() {
  const font = document.querySelector('select');
  const txt = document.querySelector('input[type="text"]');
  const strokeColor = document.querySelector('.stroke-color input');
  const fillColor = document.querySelector('.fill-color input');

  const defaults = {
    txt: '',
    font: 'montserrat',
    stroke: '#000',
    color: '#fff',
  };
  const line = gMeme.selectedLineIdx === -1 ? defaults : getSelectedLine();

  font.value = line.font;
  txt.value = line.txt;
  strokeColor.value = line.stroke;
  fillColor.value = line.color;
  console.log(font.value);
}

//////////////////////////////////////////////////

function _createLine(x, y, txt = 'Your text here') {
  return {
    id: gMeme.lines.length,
    txt,
    color: 'white',
    font: 'montserrat',
    stroke: 'black',
    align: 'center',
    size: 20,
    pos: { x, y },
  };
}
