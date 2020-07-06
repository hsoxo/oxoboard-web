import { fabric } from 'fabric'
import { socketPB } from '@/components/PaintBroad/socket'
import { TO_JSON_PROPS } from '@/components/PaintBroad/constant'
import { IEvent } from 'fabric/fabric-impl'

export const addCircle = (canvas: fabric.Canvas, color: string) => {
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

    const square = new fabric.Circle({
      radius: 1,
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

    if (!w) {
      return false;
    }

    const circle = canvas.getActiveObject();
    // @ts-ignore
    circle.set('radius', w / 2)
    canvas.renderAll();
  }

  /* Mouseup */
  function mouseup(e: IEvent) {
    if (started) {
      started = false;
    }

    const circle = canvas.getActiveObject();
    canvas.add(circle);
    canvas.renderAll();
    socketPB.emit('addPath', circle.toJSON(TO_JSON_PROPS))
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