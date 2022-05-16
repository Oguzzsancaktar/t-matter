import colors from '@/constants/colors'
import React, { useState } from 'react'
import styled from 'styled-components'

const ColorList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  list-style: none;
`

const ColorItem = styled.li`
  flex: 1;
  height: 40px;
  background-color: ${({ color }) => color};
`
const ColorTemplate = () => {
  const [colorValues, setColorValues] = useState<any>([])

  // ...Object.values(colors).forEach((color, index) => {
  //   setColorValues(colorValues.concat(Object.values(color)))
  // })

  // console.log(
  //   Object.values(colors)
  //     .map((colorObj: any) => Object.values(colorObj))
  //     .forEach((array: any) => {}),
  //   colorValues
  // )
  return (
    <div>
      <ColorList>
        {colorValues.map((color: any, index: number) => (
          <ColorItem key={index} color={color} />
        ))}
      </ColorList>
    </div>
  )
}

export default ColorTemplate
