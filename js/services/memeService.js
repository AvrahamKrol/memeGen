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

function setImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function setLineTxt(txt) {
  gMeme.lines[0].txt = txt;
}
