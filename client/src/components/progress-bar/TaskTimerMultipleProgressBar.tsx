import colors from '@/constants/colors'
import { staticColor } from '@/constants/staticColors'
import { ITaskUserWorkTime } from '@/models'
import { stringToColor } from '@/utils/colorUtils'
import React from 'react'
import styled from 'styled-components'
import { ItemContainer } from '../item-container'
import { Column, JustifyBetweenRow } from '../layout'
import { H1 } from '../texts'

interface IProps {
  isTimeFinished: boolean
  workedTimes: ITaskUserWorkTime[]
  totalDuration: number
  startLabel?: string
  endLabel?: string
}

interface IStyledProps {
  completionPercentage: number
  completionColor: string
}
const ProgressBarContainer = styled.div<{ isTimeFinished: boolean }>`
  width: 100%;
  height: 6px;
  border-radius: 0.3rem;
  background-color: ${({ isTimeFinished }) => (isTimeFinished ? colors.red.primary : colors.gray.dark)};
  display: flex;
  position: relative;
  overflow: hidden;
`

const ProgressBarRow = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 0.3rem;
  background-color: transparent;
  position: absolute;
  left: 0;
  display: flex;
`

const ProgressBarCompletion = styled.div<IStyledProps>`
  width: ${({ completionPercentage }) => `${completionPercentage}%`};
  height: 6px;
  border-radius: 0.3rem;
  background-color: ${({ completionColor }) => `${completionColor}`};
`

const TaskTimerMultipleProgressBar: React.FC<IProps> = ({
  startLabel,
  endLabel,
  workedTimes,
  totalDuration,
  isTimeFinished
}) => {
  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <ProgressBarContainer isTimeFinished={isTimeFinished}>
            {!isTimeFinished && (
              <ProgressBarRow>
                {workedTimes.map((work, index) => (
                  <ProgressBarCompletion
                    key={index}
                    data-tip={
                      work.user.firstname +
                      ' ' +
                      work.user.lastname +
                      '-' +
                      ((work.time / totalDuration) * 100).toFixed(0) +
                      '%'
                    }
                    completionPercentage={(work.time / totalDuration) * 100}
                    completionColor={staticColor[index]}
                  />
                ))}
              </ProgressBarRow>
            )}
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
    </ItemContainer>
  )
}

export default TaskTimerMultipleProgressBar
