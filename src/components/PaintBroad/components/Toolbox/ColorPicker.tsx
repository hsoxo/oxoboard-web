import React, { useContext } from 'react'
import { ColorResult, CompactPicker } from 'react-color'
import { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { IconButton, Popover } from '@material-ui/core'
import PaintBoardIcons from '@/components/PaintBroad/icons/PaintBoardIcons'
import { ICON_SIZE } from '@/components/PaintBroad/components/Toolbox/constant'
import { PaintBoardContext } from '@/components/PaintBroad/context'
import { paintBoardActions } from '@/components/PaintBroad/context/slice'
import styled from 'styled-components'

const ColorPicker = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'color-picker',
  })
  const { state: { color }, dispatch } = useContext(PaintBoardContext)

  const handleColorChangeComplete = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(paintBoardActions.setColor(color.hex))
  }

  console.log(color)
  return (
    <div>
      <IconButton {...bindTrigger(popupState)}>
        <ColorSquare color={color} />
      </IconButton>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/*//@ts-ignore */}
        <CompactPicker value={color} onChangeComplete={handleColorChangeComplete} />
      </Popover>
    </div>
  )
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
}

const ColorSquare = styled.div<{ color: string }>`
  background-color: ${p => p.color};
  border-radius: ${ICON_SIZE / 5}px;
  box-shadow: 0 0 1px 1px rgba(${p => hexToRgb(p.color)},0.75);;
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
`

export default ColorPicker