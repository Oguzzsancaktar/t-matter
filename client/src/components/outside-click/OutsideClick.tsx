import React, { useRef, useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onOutsideClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideClick(props) {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, props.onOutsideClick)

  return <div ref={wrapperRef}>{props.children}</div>
}
