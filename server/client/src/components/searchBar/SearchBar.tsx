import React from 'react'
import { Search } from 'react-feather'
import styled from 'styled-components'
import { InputWithIcon } from '../input'

interface IProps {
  onSeach: (value: string) => void
}

const SearchBarContainer = styled.div``
const SearchResultList = styled.ul``
const SearchResultListItem = styled.li``

const SearchBar: React.FC<IProps> = ({ onSeach }) => {
  return (
    <SearchBarContainer>
      <InputWithIcon onChange={event => onSeach(event.target.value)} children={<Search />} name="searchBar" />
    </SearchBarContainer>
  )
}

export default SearchBar
