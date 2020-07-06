import React, { useEffect, useReducer, useRef } from 'react';
import { initCanvas, removePath, updatePath } from "@/components/PaintBroad/fabric/initCanvas";
import styled from "styled-components";
import Toolbox from "@/components/PaintBroad/components/Toolbox";
import { initPaintBoardState, paintBoardActions, paintBoardReducer } from "@/components/PaintBroad/context/slice";
import { PaintBoardContext } from './context'
import { socketPB } from "@/components/PaintBroad/socket";


const PaintBoard = () => {
  const [state, dispatch] = useReducer(paintBoardReducer, initPaintBoardState())
  const cv = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    if (cv.current) {
      const canvas = initCanvas()
      dispatch(paintBoardActions.setCV(canvas))
    }
  }, [cv])

  useEffect(() => {
    socketPB.on('userCode', (userCode: string) => {
      dispatch(paintBoardActions.setUserCode(userCode))
    })
  }, [])

  useEffect(() => {
    socketPB.on('broadcast',(msg: any) => {
      if (msg.type === 'add') {
        state.cv && updatePath(state.cv, msg.path)
      } else if (msg.type === 'remove') {
        state.cv && removePath(state.cv, msg.path)
      }
    })
  }, [state.cv])

  return (
    <PaintBoardContext.Provider value={{ state, dispatch }}>
      <Wrapper id="cw">
        <Toolbox />
        <canvas ref={cv} id="c" />
      </Wrapper>
    </PaintBoardContext.Provider>
  );
};

const Wrapper = styled.div`
  display: flex;
  &:focus {
    outline: none;
  }
`


export default PaintBoard;
