import styled from 'styled-components'

export const List = styled.ul`
  width: 400px;
  height: 350px;

  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  gap: 0.5rem;
`
export const ListItem = styled.li`
  flex: 1;
  height: calc((100% - 0.5rem) / 3);

  &:first-child {
    flex: 2;
    min-width: calc((100% - 0.5rem) / 3 * 2);
    height: calc((100% - 0.5rem) / 3 * 2);
  }

  &:nth-child(2) {
    flex: 1;
    min-width: calc((100% - 0.5rem) / 3);
    height: calc((100% - 0.5rem) / 3 * 2);

    div {
      &:first-child {
        margin-bottom: 0.5rem;
      }
    }
  }

  &:last-child {
    min-width: calc((100% - 0.5rem) / 3);
  }
`
