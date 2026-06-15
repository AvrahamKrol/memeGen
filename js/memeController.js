'use strict';

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

function mng() {
  if (gMeme.selectedLineIdx === -1) {
    addLine();
    editMeme();
    renderMeme();
  }
}

function onSwitchLine() {
  switchLine();
  editMeme();

  renderMeme();
}

function onRemoveLine() {
  removeLine();
  editMeme();

  renderMeme();
}

function onMouseDown(ev) {
  const pos = getEvPos(ev);
  const lineIdx = getClickedLineIdx(pos);

  if (lineIdx === -1) {
    gMeme.selectedLineIdx = -1;
    editMeme();
    renderMeme();
    return;
  }

  gMeme.selectedLineIdx = lineIdx;
  editMeme();
  renderMeme();
}

function drawText(lines) {
  if (lines.length === 0) return;

  lines.forEach((line, idx) => {
    gCtx.lineWidth = 3;
    gCtx.baseLine = 'top';

    gCtx.fillStyle = line.color || 'white';
    gCtx.strokeStyle = line.stroke || 'black';

    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align || 'center';

    const { x, y, rectX, width } = getLineLayout(line, PADDING);

    gCtx.strokeText(line.txt, x, y);
    gCtx.fillText(line.txt, x, y);

    if (idx === gMeme.selectedLineIdx) {
      const rectY = y;
      drawRect(line, PADDING, width, rectX, rectY);
    }
  });
}

function drawRect(line, padding, width, x, y) {
  gCtx.save();
  gCtx.strokeStyle = 'yellow';
  gCtx.lineWidth = 2;

  gCtx.strokeRect(
    x - padding,
    y - line.size - padding,
    width + padding * 2,
    line.size + padding * 2,
  );
  gCtx.restore();
}

function getLineLayout(line, padding) {
  let { pos, align, size } = line;
  const { width } = gCtx.measureText(line.txt);

  let x;
  let rectX;
  let y = pos.y === 0 ? padding + size : pos.y;

  if (align === 'left') {
    x = padding;
    rectX = x;
  } else if (align === 'right') {
    x = gElCanvas.width - padding;
    rectX = x - width;
  } else {
    x = gElCanvas.width / 2;
    rectX = x - width / 2;
  }

  return { x, y, rectX, width };
}

function getClickedLineIdx(pos) {
  const { lines } = getMeme();
  const lineIdx = lines.findIndex((line) => {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;

    const { rectX, y, width } = getLineLayout(line, PADDING);

    const rectLeft = rectX - PADDING;
    const rectRight = rectX + width + PADDING;
    const rectTop = y - line.size - PADDING;
    const rectBottom = y + PADDING;

    return (
      pos.x > rectLeft &&
      pos.x < rectRight &&
      pos.y > rectTop &&
      pos.y < rectBottom
    );
  });

  return lineIdx;
}

function downloadCanvas(elLink) {
  elLink.download = gMeme.selectedImgId;

  const dataUrl = gElCanvas.toDataURL();
  elLink.href = dataUrl;
}

function getEvPos(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}
