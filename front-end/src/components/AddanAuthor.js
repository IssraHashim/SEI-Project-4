import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { ImageUploadField } from './ImageUploadField'
import Cookies from 'js-cookie'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const AddanAuthor = () => {
  const history = useHistory()
  const csrftoken = Cookies.get('csrftoken')
  const [formData, setFormData ] = useState({
    name: '',
    image: '',
    biography: '',
  })

  const [errors, setErrors ] = useState({
    name: '',
    image: '',
    biography: '',
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  } 

  const handleImageUrl = url => {
    setFormData({ ...formData, image: url } )
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${getTokenFromLocalStorage()}`  }
      const { data } = await axios.post('/api/authors/', formData, { headers: header })
      console.log(data.id)
      history.push(`/author/${data.id}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" rows={3} name='name' value={formData.name} onChange={handleChange} isInvalid={errors.name}/>
        {errors.name && <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group  md="3" controlId="validationFormik04">
        <Form.Label style={{ display: 'block' }}>Image</Form.Label>
        <ImageUploadField
          value={formData.image}
          name="image"
          handleImageUrl={handleImageUrl}
          isInvalid={errors.image}
        />
        {errors.image && <Form.Control.Feedback type="invalid">
          {errors.image}
        </Form.Control.Feedback>
        }
      </Form.Group>
      {formData.image &&
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
            <Image src={formData.image} alt='image' id='book_image_add' />
          </div>}
      <Form.Group  controlId="validationFormikUsername">
        <Form.Label>Biography</Form.Label>
        <Form.Control
          as="textarea"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          isInvalid={errors.biography}
        />
        {errors.biography && <Form.Control.Feedback type="invalid">
          {errors.biography}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-secondary" type="submit" >
        Add
        </Button>
      </div>
    </Form>
  )
}


export default AddanAuthor