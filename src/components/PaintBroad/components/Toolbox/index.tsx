import React, { useContext } from 'react';
import styled from "styled-components";
import { Button, IconButton } from "@material-ui/core";
import PaintBoardIcons from "@/components/PaintBroad/icons/PaintBoardIcons";
import { PaintBoardContext } from "@/components/PaintBroad/context";
import { selectMode } from "@/components/PaintBroad/fabric/selectMode";
import { ICON_SIZE } from '@/components/PaintBroad/components/Toolbox/constant'
import ColorPicker from '@/components/PaintBroad/components/Toolbox/ColorPicker'
import { addRectangle } from '@/components/PaintBroad/fabric/shapes/rectangle'
import { addCircle } from '@/components/PaintBroad/fabric/shapes/circle'
import { addLine } from '@/components/PaintBroad/fabric/shapes/line'
import { addTextBox } from '@/components/PaintBroad/fabric/shapes/textbox'
import { addGrid } from "@/components/PaintBroad/fabric/shapes/grid";

const Toolbox = () => {
  const { state: { cv, color }} = useContext(PaintBoardContext)

  const handleSelectMode = () => cv && selectMode(cv)
  const handleFreeDrawMode = () => cv && (cv.isDrawingMode = true)
  const handleAddRectangle = () => cv && addRectangle(cv, color)
  const handleAddCircle = () => cv && addCircle(cv, color)
  const handleAddGrid = () => cv && addGrid(cv)
  const handleAddLine = () => cv && addLine(cv, color)
  const handleAddTextBox = () => cv && addTextBox(cv, color)

  return (
    <Wrapper>
      <IconButton onClick={handleSelectMode}>
        <PaintBoardIcons size={ICON_SIZE} name={'selector'} />
      </IconButton>
      <IconButton onClick={handleFreeDrawMode}>
        <PaintBoardIcons size={ICON_SIZE} name={'pencil'} />
      </IconButton>
      <IconButton onClick={handleAddLine}>
        <PaintBoardIcons size={ICON_SIZE} name={'vector'} />
      </IconButton>
      <IconButton onClick={handleAddCircle}>
        <PaintBoardIcons size={ICON_SIZE} name={'ellipse'} />
      </IconButton>
      <IconButton onClick={handleAddRectangle}>
        <PaintBoardIcons size={ICON_SIZE} name={'rectangle'} />
      </IconButton>
      <IconButton onClick={handleAddGrid}>
        <PaintBoardIcons size={ICON_SIZE} name={'grid'} />
      </IconButton>
      <IconButton onClick={handleAddTextBox}>
        <PaintBoardIcons size={ICON_SIZE} name={'text'} />
      </IconButton>
      <ColorPicker />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 44px;
  flex-direction: column;
`
export default Toolbox;