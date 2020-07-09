import { fabric } from 'fabric'
import { TO_JSON_PROPS } from '@/components/PaintBroad/constant'
import { IEvent } from 'fabric/fabric-impl'

export const addLine = (canvas: fabric.Canvas, color: string, socket: SocketIOClient.Socket) => {
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

    const line = new fabric.Line(
      [x, y, x, y,],
      {
        stroke: color,
        strokeWidth: 1,
        hasControls: false,
        hasBorders: false,
        // selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: "default",
        originX: "center",
        originY: "center"
      });

    canvas.add(line);
    canvas.renderAll();
    canvas.setActiveObject(line);
  }

  /* Mousemove */
  function mousemove(e: IEvent) {
    if (!started) {
      return false;
    }

    const mouse = canvas.getPointer(e.e);

    let w = mouse.x - x
    let h = mouse.y - y

    if (!w || !h) {
      return false;
    }

    const line = canvas.getActiveObject();

    if (Math.abs(w / h) < 0.01) { w = 0 }
    if (Math.abs(h / w) < 0.01) { h = 0 }

    // @ts-ignore
    line.set('x1', x ).set('y1', y).set('x2', x + w).set('y2', y + h)

    canvas.renderAll();
    canvas.calcOffset();
  }

  /* Mouseup */
  function mouseup(e: IEvent) {
    if (started) {
      started = false;
    }

    const circle = canvas.getActiveObject();
    canvas.add(circle);
    canvas.renderAll();
    socket.emit('addPath', circle.toJSON(TO_JSON_PROPS))
  }

  canvas.on('mouse:down', mousedown);
  canvas.on('mouse:move', mousemove);
  canvas.on('mouse:up', mouseup);
}