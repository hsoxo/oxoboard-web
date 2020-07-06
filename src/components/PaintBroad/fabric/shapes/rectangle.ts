import { fabric } from 'fabric'
import { TO_JSON_PROPS } from '@/components/PaintBroad/constant'
import { socketPB } from '@/components/PaintBroad/socket'
import { IEvent } from 'fabric/fabric-impl'

export const addRectangle = (canvas: fabric.Canvas, color: string) => {
  canvas.isDrawingMode = false

  let started = false;
  let x = 0;
  let y = 0;

  /* Mousedown */
  function mousedown(e: IEvent) {
    const mouse = canvas.getPointer(e.e);
    started = true;
    x = mouse.x;
    y = mouse.y;

    const square = new fabric.Rect({
      width: 1,
      height: 1,
      left: x,
      top: y,
      fill: color
    });

    canvas.add(square);
    canvas.renderAll();
    canvas.setActiveObject(square);
  }


  /* Mousemove */
  function mousemove(e: IEvent) {
    if (!started) {
      return false;
    }

    const mouse = canvas.getPointer(e.e);

    const w = Math.abs(mouse.x - x)
    const h = Math.abs(mouse.y - y);

    if (!w || !h) {
      return false;
    }

    const square = canvas.getActiveObject();
    square.set('width', w).set('height', h);
    canvas.renderAll();
  }

  /* Mouseup */
  function mouseup(e: IEvent) {
    if (started) {
      started = false;
    }

    const square = canvas.getActiveObject();
    if (square) {
      console.log(square.toJSON(TO_JSON_PROPS))
      socketPB.emit('addPath', square.toJSON(TO_JSON_PROPS))
    }

    canvas.add(square);
    canvas.renderAll();
    socketPB.emit('addPath', square.toJSON(TO_JSON_PROPS))
    new Promise(() => {
      canvas.off('mouse:down', mousedown);
      canvas.off('mouse:move', mousemove);
      canvas.off('mouse:up', mouseup);
    })
  }

  canvas.on('mouse:down', mousedown);
  canvas.on('mouse:move', mousemove);
  canvas.on('mouse:up', mouseup);
}
