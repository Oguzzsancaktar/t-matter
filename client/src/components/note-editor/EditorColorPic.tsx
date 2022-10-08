import React, { useState } from 'react'
import { FaPalette } from 'react-icons/fa'
import { ItemContainer } from '../item-container'
import { BlockPicker } from 'react-color'

const EditorColorPic = ({ currentState, onChange }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const { color } = currentState

  const stopPropagation = event => {
    event.stopPropagation()
  }

  const handleChange = color => {
    setExpanded(false)
    onChange('color', color.hex)
  }

  const renderModal = () => {
    return (
      <div className="draft-color-modal" onClick={stopPropagation}>
        <BlockPicker color={color} onChangeComplete={handleChange} />
      </div>
    )
  }

  return (
    <div className="draft-color-wrapper" aria-haspopup="true" aria-expanded={expanded} aria-label="rdw-color-picker">
      <ItemContainer onClick={() => setExpanded(!expanded)} cursorType="pointer">
        <FaPalette />
      </ItemContainer>

      {expanded ? renderModal() : undefined}
    </div>
  )
}

export default EditorColorPic
