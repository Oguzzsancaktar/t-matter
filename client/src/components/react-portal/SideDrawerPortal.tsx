import { createPortal } from 'react-dom'

function SideDrawerPortal({ children, wrapperId, isOpen }) {
  const wrapper = document.getElementById(wrapperId)
  if (isOpen) {
    wrapper?.classList.add('open')
  } else {
    wrapper?.classList.remove('open')
  }
  if (wrapper) {
    return createPortal(children, wrapper)
  }
  return null
}
export default SideDrawerPortal
