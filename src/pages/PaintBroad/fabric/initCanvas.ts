// @ts-nocheck
import { fabric } from 'fabric'
import { nanoid } from '@/utils/uuid'
import { socketPB } from '@/pages/PaintBroad/socket'

const TO_JSON_PROPS = ['id', 'evented', 'selectable']

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
  canvas.setHeight(600)
  canvas.setWidth(800)
  canvas.backgroundColor = '#fafafa'
  canvas.freeDrawingBrush.color = 'black'
  canvas.freeDrawingBrush.width = 5

  canvas.on('object:added', e => {
    if (!e.target) return
    if (!e.target.id) {
      e.target.set('id', nanoid())
      socketPB.emit('addPath', e.target.toJSON(TO_JSON_PROPS))
      console.log('addPath', e.target.toJSON(TO_JSON_PROPS))
    }
  })

  canvas.on('object:modified', e => {
    socketPB.emit('addPath', e.target.toJSON(TO_JSON_PROPS))
  })

  canvas.on('object:removed', e => {
    socketPB.emit('removePath', e.target.toJSON(TO_JSON_PROPS))
  })

  canvas.renderAll()

  return canvas
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
        if (existObj.type === 'line') {
          const updateFields = ['left', 'top', 'scaleX', 'scaleY', 'angle']
          existObj.set(Object.entries(path).filter(([k, v]) => updateFields.includes(k)).reduce((a, [k, v]) => ({...a, [k]: v}), {}))
        } else {
          existObj.set(path)
        }
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


