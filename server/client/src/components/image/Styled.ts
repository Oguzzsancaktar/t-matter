import styled from 'styled-components'

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  border-radius: 0.3rem;
  border: 1px solid red;
`

export const RemoveButton = styled.button`
  position: absolute;
  right: calc(0.5rem - 1px);
  top: calc(0.5rem - 1px);
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  width: 30px;
  height: 30px;
  background-color: red;
  border: 1px solid green;
  border-top-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;

  color: white;
  cursor: pointer;
`

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: gray;
  width: 100%;
  height: 100%;
  color: white;
  cursor: pointer;
`

export const Figure = styled.figure`
  width: 100%;
  height: 100%;
  margin: 0;
`
export const Picture = styled.picture`
  width: 100%;
  height: 100%;
`
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3rem;
`
