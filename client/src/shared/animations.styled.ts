import { keyframes } from 'styled-components'

export const breatheAnimation = keyframes`
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`

export const speechAnimation = keyframes`
 0% {opacity:1  }
 50% {  opacity: 0.5; }
 100% {  opacity: 1; }
`
