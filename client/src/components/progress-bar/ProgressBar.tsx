import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'
import { ItemContainer } from '../item-container'
import { Column, JustifyBetweenRow } from '../layout'
import { H1 } from '../texts'

interface IProps {
  startLabel?: string
  endLabel?: string
  completionPercentage: number
  completionColor: string
  reverse?: boolean
}

interface IStyledProps {
  completionPercentage: number
  completionColor: string
}
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 0.3rem;
  background-color: ${colors.gray.dark};
  display: flex;
  position: relative;
  overflow: hidden;
`
const ProgressBarCompletion = styled.div<IStyledProps>`
  width: ${({ completionPercentage }) => `${completionPercentage}%`};
  height: 6px;
  border-radius: 0.3rem;
  background-color: ${({ completionColor }) => `${completionColor}`};
  position: absolute;
  left: 0;
`

const ProgressBar: React.FC<IProps> = ({
  startLabel,
  endLabel,
  completionPercentage,
  completionColor,
  reverse = false
}) => {
  return (
    <ItemContainer>
      {reverse ? (
        <Column>
          <ItemContainer>
            <JustifyBetweenRow>
              <H1 width="auto" color={colors.black.middle}>
                {startLabel}
              </H1>
              <H1 width="auto" color={colors.black.middle}>
                {endLabel}
              </H1>
            </JustifyBetweenRow>
          </ItemContainer>
          <ItemContainer>
            <ProgressBarContainer>
              <ProgressBarCompletion completionPercentage={completionPercentage} completionColor={completionColor} />
            </ProgressBarContainer>
          </ItemContainer>
        </Column>
      ) : (
        <Column>
          <ItemContainer>
            <ProgressBarContainer>
              <ProgressBarCompletion completionPercentage={completionPercentage} completionColor={completionColor} />
            </ProgressBarContainer>
          </ItemContainer>
          <ItemContainer>
            <JustifyBetweenRow>
              <H1 width="auto" color={colors.black.middle}>
                {startLabel}
              </H1>
              <H1 width="auto" color={colors.black.middle}>
                {endLabel}
              </H1>
            </JustifyBetweenRow>
          </ItemContainer>
        </Column>
      )}
    </ItemContainer>
  )
}

export default ProgressBar
