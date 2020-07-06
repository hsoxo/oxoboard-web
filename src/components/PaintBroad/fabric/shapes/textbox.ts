import { fabric } from 'fabric'

export const addTextBox = (canvas: fabric.Canvas, color: string) => {
  canvas.isDrawingMode = false
  const tb = new fabric.Textbox('请输入文字', {
    left: 50,
    top: 50,
    width: 150,
    fontSize: 20,
    fill: color,
    hasRotatingPoint: false,
    hasControls: false,
  });
  canvas.add(tb)
}