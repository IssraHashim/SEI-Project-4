
import React from 'react'
import axios from 'axios'

const uploadUrl = 'https://api.cloudinary.com/v1_1/dgcme57zq/image/upload'
const uploadPreset = 'mhhmdurn'


export const ImageUploadField = ({ handleImageUrl }) => {


  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    handleImageUrl(res.data.url)
  }
  
  return (
    <>
      <input 
        className='input'
        type='file'
        onChange={handleUpload}
      />
    </>
  )
}