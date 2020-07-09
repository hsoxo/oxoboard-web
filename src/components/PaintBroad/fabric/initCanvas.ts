// @ts-nocheck
import { fabric } from 'fabric'
import { nanoid } from '@/utils/uuid'
import { PAPER_HEIGHT, PAPER_WIDTH, TO_JSON_PROPS } from '@/components/PaintBroad/constant'
import { socketPB } from '@/components/PaintBroad/socket'
import { IEvent } from 'fabric/fabric-impl'


const updateFields = ['left', 'top', 'scaleX', 'scaleY', 'angle', 'height', 'width', 'radius', 'text']


fabric.Canvas.prototype.getObjectById = function (id) {
  const objs = this.getObjects()
  for (let i = 0, len = objs.length; i < len; i++) {
    if (objs[i].id == id) {
      return objs[i]
    }
  }
  return 0
}

fabric.Canvas.prototype.stringify = function (id) {
  const objs = this.getObjects()
  return objs.map(x => x.toJSON(['id']))
}

export const initCanvas = () => {
  const canvas = new fabric.Canvas('c')
  canvas.setHeight(PAPER_HEIGHT)
  canvas.setWidth(PAPER_WIDTH)
  canvas.backgroundColor = '#fafafa'
  canvas.freeDrawingBrush.color = 'black'
  canvas.freeDrawingBrush.width = 5
  canvas.selection = false

  const canvasWrapper = document.getElementById('cw');
  canvasWrapper.tabIndex = 1000;
  canvasWrapper.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const obj = canvas.getActiveObjects()
      canvas.remove(...obj)
    }
  }, false);

  canvas.renderAll()

  return canvas
}

export const addEventHandlers = (cv: fabric.Canvas, socket: SocketIOClient.Socket) => {
  console.log('addEventHandlers')
  cv.on('object:added', (e: IEvent) => {
    console.log('object:added')
    if (!e.target) return
    if (!e.target.id) {
      e.target.set('id', nanoid())
      socket.emit('addPath', e.target.toJSON(TO_JSON_PROPS))
      console.log('addPath', e.target.toJSON(TO_JSON_PROPS))
    }
  })

  cv.on('object:modified', (e: IEvent) => {
    socket.emit('addPath', e.target.toJSON(TO_JSON_PROPS))
    console.log('updatePath', e.target.toJSON(TO_JSON_PROPS))
  })

  cv.on('object:removed', (e: IEvent) => {
    socket.emit('removePath', e.target.toJSON(TO_JSON_PROPS))
  })

  socket.on('broadcast',(msg: any) => {
    console.log(msg)
    if (msg.type === 'add') {
      cv && updatePath(cv, msg.path)
    } else if (msg.type === 'remove') {
      cv && removePath(cv, msg.path)
    }
  })

  socket.on('initBoard', (r: any) => {
    console.log(r, cv)
    r.paths.forEach(x => cv && updatePath(cv, JSON.parse(x.path)))
  })
}

export const addPath = (canvas: fabric.Canvas, path: fabric.Object) => {
  fabric.util.enlivenObjects([path], objects => {
    const origRenderOnAddRemove = canvas.renderOnAddRemove
    canvas.renderOnAddRemove = false

    objects.forEach(function (o) {
      canvas.add(o)
    })
    canvas.renderOnAddRemove = origRenderOnAddRemove
    canvas.renderAll()
  })
}

export const updatePath = (canvas: fabric.Canvas, path: fabric.Object) => {
  console.log(123213)
  if (path.type === "activeSelection") {
    path.objects.forEach(x => {
      const existObj = canvas.getObjectById(x.id)
      canvas.setActiveObject(existObj)
    })
    const selection = canvas.getActiveObject()
    selection.set({left: path.left, top: path.top})
    return
  }
  fabric.util.enlivenObjects([path], objects => {
    const origRenderOnAddRemove = canvas.renderOnAddRemove
    canvas.renderOnAddRemove = false
    objects.forEach((o) => {
      const existObj = canvas.getObjectById(o.id)
      if (existObj) {
        existObj.set(Object.entries(path).filter(([k, v]) => updateFields.includes(k)).reduce((a, [k, v]) => ({...a, [k]: v}), {}))
      } else {
        canvas.add(o)
      }

    })
    canvas.renderOnAddRemove = origRenderOnAddRemove
    canvas.renderAll()
    canvas.calcOffset();
  })
}

export const removePath = (canvas: fabric.Canvas, path: fabric.Object) => {
  const id = path.id
  const existObj = canvas.getObjectById(id)
  if (existObj) {
    canvas.setActiveObject(existObj)
    canvas.remove(canvas.getActiveObject())
  }
}


