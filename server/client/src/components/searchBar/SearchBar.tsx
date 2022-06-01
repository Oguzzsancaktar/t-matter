import React from 'react'
import { Search } from 'react-feather'
import styled from 'styled-components'
import { InputWithIcon } from '../input'

const SearchBarContainer = styled.div``
const SearchResultList = styled.ul``
const SearchResultListItem = styled.li``

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <InputWithIcon children={<Search />} name="searchBar" />
    </SearchBarContainer>
  )
}

export default SearchBar
