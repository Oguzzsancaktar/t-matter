import React from 'react'
import { UserImage } from '../image'
import { Column } from '../layout'
import { List, ListItem } from './Styled'

const ProfileImages = () => {
  return (
    <List>
      <ListItem>
        <UserImage />
      </ListItem>
      <ListItem>
        <Column>
          <UserImage />
          <UserImage />
        </Column>
      </ListItem>
      <ListItem>
        <UserImage />
      </ListItem>
      <ListItem>
        <UserImage />
      </ListItem>
      <ListItem>
        <UserImage />
      </ListItem>
    </List>
  )
}

export default ProfileImages
