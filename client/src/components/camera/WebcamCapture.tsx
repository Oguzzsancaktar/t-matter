import colors from '@/constants/colors'
import React, { Component, useState } from 'react'
import { Camera, X } from 'react-feather'
import Webcam from 'react-webcam'
import { Button } from '../button'
import { ItemContainer } from '../item-container'
import { JustifyBetweenColumn, JustifyCenterRow, Row } from '../layout'
import { H1 } from '../texts'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  facingMode: 'user'
}

interface IProps {
  onCapture: (file: any) => void
  handleShowCamera: (show: boolean) => void
}
const WebcamCapture: React.FC<IProps> = ({ onCapture, handleShowCamera }) => {
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef?.current?.getScreenshot()
    onCapture(imageSrc)
  }, [webcamRef])

  return (
    <ItemContainer
      width="100%"
      height="100%"
      backgroundColor={colors.white.secondary}
      borderLeft={'1px solid ' + colors.white.secondary}
      borderRight={'1px solid ' + colors.white.secondary}
    >
      <JustifyBetweenColumn width="100%" height="100%">
        <ItemContainer
          backgroundColor={colors.secondary.middle}
          height="35px"
          position="relative"
          borderRadius="0.3rem"
        >
          <ItemContainer
            position="absolute"
            left="calc(100% - 0.3rem)"
            borderRadius="0.3rem"
            backgroundColor={colors.secondary.dark}
            width="auto"
            padding="0.1rem"
            top="50%"
            transform="translate(-100% , -50%)"
            cursorType="pointer"
          >
            <X color={colors.white.secondary} size={20} onClick={() => handleShowCamera(false)} />
          </ItemContainer>
        </ItemContainer>
        <ItemContainer height="calc(100% - 35px - 35px - 1rem)" width="100%">
          <Webcam
            audio={false}
            height={'100%'}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={'100%'}
            videoConstraints={videoConstraints}
          />
        </ItemContainer>

        <Button
          width="100%"
          height="35px"
          color={colors.secondary.middle}
          onClick={e => {
            e.preventDefault()
            capture()
          }}
        >
          <JustifyCenterRow>
            <H1 width="auto" margin="0 0.5rem" color={colors.secondary.dark}>
              Take Photo{' '}
            </H1>
            <Camera color={colors.secondary.dark} />
          </JustifyCenterRow>
        </Button>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default WebcamCapture
