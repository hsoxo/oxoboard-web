import * as React from 'react'
import {Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

export interface DialogOptions {
  catchOnCancel?: boolean
  variant: 'danger' | 'info'
  title?: string
  description: string
}

interface CustomDialogProps extends DialogOptions {
  open: boolean
  submitText?: string
  onSubmit: () => void
  onClose: () => void
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  variant,
  description,
  submitText,
  onSubmit,
  onClose
}) => {
  return (
    <Dialog open={open}>
      {title ? <DialogTitle id="alert-dialog-title">{title}</DialogTitle> : null}
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <Box padding={'5px 20px 15px'} textAlign={'right'}>
        {variant === 'danger' && (
          <Box display={'flex'} flexDirection={'row-reverse'}>
            <Button onClick={onSubmit}>YES, I AGREE</Button>
            <Box width={10} />
            <Button onClick={onClose} autoFocus>
              CANCEL
            </Button>
          </Box>
        )}

        {variant === 'info' && (
          <Button onClick={onSubmit}>
            {submitText || 'DISMISS'}
          </Button>
        )}
      </Box>
    </Dialog>
  )
}

const DialogServiceContext = React.createContext<
  (options: DialogOptions) => Promise<void>
>(Promise.reject)

export const useDialog = () => React.useContext(DialogServiceContext)

export const DialogServiceProvider: React.FC = ({ children }) => {
  const [dialogState, setDialogState] = React.useState<DialogOptions | null>(
    null
  )

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void
    reject: () => void
  }>()

  const openDialog = (options: DialogOptions) => {
    setDialogState(options)
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  const handleClose = () => {
    if (
      dialogState &&
      dialogState.catchOnCancel &&
      awaitingPromiseRef.current
    ) {
      awaitingPromiseRef.current.reject()
    }

    setDialogState(null)
  }

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve()
    }

    setDialogState(null)
  }

  return (
    <>
      <DialogServiceContext.Provider value={openDialog} children={children} />
      {/*// @ts-ignore*/}
      <CustomDialog
        open={Boolean(dialogState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...dialogState}
      />
    </>
  )
}
