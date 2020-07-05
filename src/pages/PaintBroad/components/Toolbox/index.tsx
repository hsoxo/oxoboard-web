import React, { useContext } from 'react';
import styled from "styled-components";
import { Button, IconButton } from "@material-ui/core";
import PaintBoardIcons from "@/pages/PaintBroad/icons/PaintBoardIcons";
import { PaintBoardContext } from "@/pages/PaintBroad/context";
import { addCircle, addLine, addRectangle, addTextBox } from "@/pages/PaintBroad/fabric/addShapes";
import { addGrid } from "@/pages/PaintBroad/fabric/addGrid";
import { selectMode } from "@/pages/PaintBroad/fabric/selectMode";

const ICON_SIZE = 20


const Toolbox = () => {
  const { state: { cv }} = useContext(PaintBoardContext)

  const handleSelectMode = () => cv && selectMode(cv)
  const handleFreeDrawMode = () => cv && (cv.isDrawingMode = true)
  const handleAddRectangle = () => cv && addRectangle(cv)
  const handleAddCircle = () => cv && addCircle(cv)
  const handleAddGrid = () => cv && addGrid(cv)
  const handleAddLine = () => cv && addLine(cv)
  const handleAddTextBox = () => cv && addTextBox(cv)

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
      <IconButton>
        <PaintBoardIcons size={ICON_SIZE} name={'color'} />
      </IconButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 44px;
  flex-direction: column;
`
export default Toolbox;