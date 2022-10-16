import colors from '@/constants/colors'
import { staticColor } from '@/constants/staticColors'
import { ITaskUserWorkTime } from '@/models'
import { stringToColor } from '@/utils/colorUtils'
import { secondsToHourMin } from '@/utils/timeUtils'
import React from 'react'
import ReactTooltip from 'react-tooltip'
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
  handleUserWorkClick: (userId: string) => void
}

interface IStyledProps {
  completionPercentage: number
  completionColor: string
}

const StyledReactTooltip = styled(ReactTooltip)`
  border-radius: 0.3rem !important;
  transition: 0s !important;
  width: 200px;
  opacity: 1 !important;
  overflow: hidden;
  padding: 0 !important;
  background-color: ${colors.white.secondary}!important;
`

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
  cursor: pointer;
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
  isTimeFinished,
  handleUserWorkClick
}) => {
  return (
    <ItemContainer>
      <Column>
        <ItemContainer>
          <ProgressBarContainer isTimeFinished={isTimeFinished}>
            {!isTimeFinished && (
              <ProgressBarRow>
                {workedTimes.map((work, index) => (
                  <>
                    <ProgressBarCompletion
                      onClick={() => handleUserWorkClick(work.user._id)}
                      key={index}
                      data-tip={
                        work.user.firstname +
                        ' ' +
                        work.user.lastname +
                        '-' +
                        ((work.time / totalDuration) * 100).toFixed(0) +
                        '%'
                      }
                      data-for={'taskMultipleProgress-' + work.user._id}
                      completionPercentage={(work.time / totalDuration) * 100}
                      completionColor={staticColor[index]}
                    />
                    <StyledReactTooltip id={'taskMultipleProgress-' + work.user._id} effect="solid">
                      <Column width="100%">
                        <ItemContainer
                          backgroundColor={colors.blue.primary + '22'}
                          transition="0"
                          width="100%"
                          padding="0.3rem 0.5rem"
                        >
                          <H1 width="100%" textAlign="center" color={colors.text.primary}>
                            {work.user.firstname + ' ' + work.user.lastname}
                          </H1>
                        </ItemContainer>

                        <ItemContainer transition="0" width="100%" padding="0.4rem 0.5rem">
                          <H1 width="100%" textAlign="center" color={colors.text.primary}>
                            Total: {secondsToHourMin(work.time, true)}
                          </H1>
                        </ItemContainer>
                      </Column>
                    </StyledReactTooltip>
                  </>
                ))}
              </ProgressBarRow>
            )}
          </ProgressBarContainer>
        </ItemContainer>
        <ItemContainer width="100%">
          <JustifyBetweenRow width="100%">
            <H1 width="100%" textAlign="center" color={colors.black.middle}>
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
