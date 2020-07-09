import React, { useEffect, useReducer, useRef } from 'react';
import { addEventHandlers, initCanvas, removePath, updatePath } from '@/components/PaintBroad/fabric/initCanvas'
import styled from "styled-components";
import Toolbox from "@/components/PaintBroad/components/Toolbox";
import { initPaintBoardState, paintBoardActions, paintBoardReducer } from "@/components/PaintBroad/context/slice";
import { PaintBoardContext } from './context'
import io from "socket.io-client"
import { nanoid } from '@/utils/uuid'
import { socketPB } from '@/components/PaintBroad/socket'
import { TO_JSON_PROPS } from '@/components/PaintBroad/constant'
import { IEvent } from 'fabric/fabric-impl'
import { sNickname } from '@/utils/storage'


const PaintBoard: React.FC<{ boardId: string, userCode: string }> = ({ boardId, userCode }) => {
  const [state, dispatch] = useReducer(paintBoardReducer, initPaintBoardState())
  const cv = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    if (cv.current) {
      const canvas = initCanvas()
      dispatch(paintBoardActions.setCV(canvas))
    }
  }, [cv])

  useEffect(() => {
    if (state.cv && state.socket) {
      addEventHandlers(state.cv, state.socket)
    }
  }, [state.cv, state.socket])

  useEffect(() => {
    const socket = io(`${process.env.WS_BASE}/paint`, {
      query: {
        boardId,
        userCode,
        nickname: sNickname.get()
      }
    })
    dispatch(paintBoardActions.setSocket(socket))
  }, [boardId])

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
