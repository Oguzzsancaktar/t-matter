import React, { useEffect, useState } from 'react'
import { Column, Row, Form, InputWithIcon, InputRegular, Button } from '@/components'
import { Battery, CheckSquare, Mail, Map, Phone, User } from 'react-feather'
import useAccessStore from '@/hooks/useAccessStore'
import { selectUser } from '@/store'
import { IUserUpdateDTO } from '@/models'
import { useUpdateUserMutation } from '@/services/userService'

const ProfileUpdateForm = () => {
  const { useAppSelector } = useAccessStore()
  const user = useAppSelector(selectUser)

  const [updateUser] = useUpdateUserMutation()

  const [updateProfileData, setUpdateProfileData] = useState<IUserUpdateDTO>({
    _id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    birthplace: '',
    description: ''
  })

  useEffect(() => {
    if (user) {
      setUpdateProfileData({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthday: user.birthday,
        birthplace: user.birthplace,
        description: user.description
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdateProfileData({ ...updateProfileData, [name]: value })
  }

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updatedUser = await updateUser(updateProfileData)
    console.log('user updated successfully ', updatedUser)
  }

  return (
    <Form onSubmit={handleUpdateProfile}>
      <Column>
        <Row>
          <InputWithIcon
            name="firstname"
            placeholder="adınızı giriniz."
            type="tel"
            onChange={handleInputChange}
            onBlur={() => console.log('blur input')}
            value={updateProfileData.firstname}
          >
            <User />
          </InputWithIcon>
          <InputWithIcon
            name="lastname"
            placeholder="lastname"
            type="text"
            onChange={handleInputChange}
            onBlur={() => console.log('blur input')}
            value={updateProfileData.lastname}
          >
            <User />
          </InputWithIcon>
        </Row>

        <Row>
          <InputWithIcon
            name="phone"
            placeholder="Telefon numaranızı giriniz."
            type="tel"
            onChange={handleInputChange}
            onBlur={() => console.log('blur input')}
            value={updateProfileData.phone}
          >
            <Phone />
          </InputWithIcon>
          <InputWithIcon
            name="email"
            placeholder="E posta adresiniz"
            type="email"
            onChange={handleInputChange}
            onBlur={() => console.log('blur input')}
            value={updateProfileData.email}
          >
            <Mail />
          </InputWithIcon>
        </Row>

        <Row>
          <InputWithIcon
            name="birthday"
            placeholder="Doğum günü"
            type="text"
            onChange={handleInputChange}
            onBlur={() => console.log('blur input')}
            value={updateProfileData.birthday}
          >
            <CheckSquare />
          </InputWithIcon>
          <InputWithIcon
            name="birthplace"
            placeholder="Dogum yerinizi giriniz"
            type="text"
            onChange={handleInputChange}
            onBlur={() => console.log('blur input')}
            value={updateProfileData.birthplace}
          >
            <Battery />
          </InputWithIcon>
        </Row>

        <Row>adress</Row>

        <Row>
          <InputRegular
            name="description"
            onChange={handleInputChange}
            type="textarea"
            placeholder="açıklama girebilirsiniz"
            value={updateProfileData.description}
          />
        </Row>
      </Column>
      <Button>Güncelle</Button>
    </Form>
  )
}

export default ProfileUpdateForm
