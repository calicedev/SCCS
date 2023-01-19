import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'


export default function Profile() {
  return(
    
    <ProfileContent>
      <div>
        Profile
        asddd
        vvvvvvvvvvvvvvvvvv
        vvvvvvvvvvvvvvvvvv
        <input type='file' 
            accept='image/jpg,impge/png,image/jpeg,image/gif' 
            name='profile_img' 
            onChange={onChange}>
        </input>
      </div>
      <ProfileInput
          type="name"

      ></ProfileInput>

      <Container>
        <ProfileInput
            type="id"

        ></ProfileInput >
        <ProfileInput
          type="nickname"

        ></ProfileInput>
      </Container>

      <ProfileInput
        type="email"

      ></ProfileInput>
      <Button value="Edit"></Button>
    </ProfileContent>

  )
  
}

const ProfileContent = styled.div`
  display: flex;
  
  border-radius: 10px;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
`

const onChange = (e) => {
  const img = e.target.files[0];
  const formData = new FormData();
  formData.append('img', img);
  for (const keyValue of formData) console.log(keyValue); 
}