import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children }: any) =>
  ReactDOM.createPortal(children, document.body)

interface PortalTooltipProps {
  active: boolean
}
const PortalTooltip: React.FC<PortalTooltipProps> = ({ active, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [eventListener, setEventListener] = useState<EventListener | null>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) { return }
    el.style.left = `${e.clientX + 20}px`
    el.style.top = `${e.clientY + 20}px`
  }
  useEffect(() => {
    const el = ref.current
    if (!el) { return }

    if (active) {
      el.style.display = 'block'
      el.style.opacity = '1'
      el.style.zIndex = '2147483627'
      el.style.position = 'fixed'
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      el.style.display = 'none'
      el.style.opacity = '0'
      window.removeEventListener('mousemove', handleMouseMove)
    }

  }, [active])

  return (
    <Portal>
      <div ref={ref}>{children}</div>
    </Portal>
  )
}

export default PortalTooltip
