import { useEffect, useRef } from 'react'

export const useAnimationFrame = callback => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    //@ts-ignore
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    //@ts-ignore
    requestRef.current = requestAnimationFrame(animate) || 0
    return () => cancelAnimationFrame(requestRef?.current || 0)
  }, [])
}
