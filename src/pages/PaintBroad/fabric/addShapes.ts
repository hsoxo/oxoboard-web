// @ts-ignore
import { fabric } from 'fabric'

export const addRectangle = (canvas: fabric.Canvas) => {
  const rect = new fabric.Rect({
    top: 20, left: 20, width: 80, height: 50, fill: 'red' });
  canvas.add(rect)
}

export const addCircle = (canvas: fabric.Canvas) => {
  const circle = new fabric.Circle({
    radius: 50, left: 20, top: 20, fill: '#aac' });
  canvas.add(circle)
}

export const addLine = (canvas: fabric.Canvas) => {
  const line = new fabric.Line([50, 100, 200, 100], { top: 20, left: 20, stroke: 'rgba(0, 0, 0, 1)', strokeWidth: 1});
  canvas.add(line)
}

export const addTextBox = (canvas: fabric.Canvas) => {
  const tb = new fabric.Textbox('请输入文字', {
    left: 50,
    top: 50,
    width: 150,
    fontSize: 20
  });
  canvas.add(tb)
}