import { fabric } from 'fabric'
import { PAPER_HEIGHT, PAPER_WIDTH } from '@/components/PaintBroad/constant'


const GRID_NAME = '_bg_grid'

export const addGrid = (canvas: fabric.Canvas) => {
  const objs = canvas.getObjects()
  const grid = objs.find(x => x.name === GRID_NAME)
  if (grid) {
    canvas.setActiveObject(grid)
    canvas.remove(canvas.getActiveObject())
  } else {
    const lineOption = {stroke: 'rgba(0,0,0, .1)', strokeWidth: 1, selectable:false, strokeDashArray: [3, 3], evented: false};

    // to manipulate grid after creation
    const lines = []

    const gridSize = 50; // define grid size

    // do in two steps to limit the calculations
    // first loop for vertical line
    for(let i = Math.ceil(PAPER_WIDTH/gridSize); i--;){
      if (i > 0) {
        lines.push( new fabric.Line([gridSize*i, 0, gridSize*i, PAPER_HEIGHT], lineOption) );
      }
    }
    // second loop for horizontal line
    for(let i = Math.ceil(PAPER_HEIGHT/gridSize); i--;){
      if (i > 0) {
        lines.push(new fabric.Line([0, gridSize * i, PAPER_WIDTH, gridSize * i], lineOption));
      }
    }
    const newGrid = new fabric.Group(lines, {left: 0, top: 0, evented: false, selectable: false})
    newGrid.set('name', GRID_NAME)
    // Group add to canvas
    canvas.add(newGrid)
    canvas.renderAll()
  }

}