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

function setSelectedImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function setLineTxt(txt) {
  gMeme.lines[0].txt = txt;
}

function drawText(line) {
  gCtx.lineWidth = 4;
  gCtx.fillStyle = line.color || 'white';
  gCtx.strokeStyle = 'black';

  gCtx.font = `${line.size}px Montserrat`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'top';

  const x = gElCanvas.width / 2;
  const y = 20;

  gCtx.strokeText(line.txt, x, y);
  gCtx.fillText(line.txt, x, y);
}
