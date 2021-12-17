import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { useHistory } from 'react-router-dom'
import axios from 'axios'



const UpdateAnAuthor = ( { author, setShowUpdate, setAuthor, showUpdate } ) => {
  const history = useHistory()
  const csrftoken = Cookies.get('csrftoken')

  const [formData, setFormData] = useState({
    name: author.name,
    biography: author.biography,
  })

  const [errors, setErrors ] = useState({
    name: '',
    biography: '',
  })



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${getTokenFromLocalStorage()}`  }
      await axios.put(`/api/authors/${author.id}/`, formData, { headers: header })
      const { data } = await axios.get(`/api/authors/${author.id}/`)
      setShowUpdate(!showUpdate)
      setAuthor(data)
      history.push(`/author/${data.id}`)
    } catch (err) {
      setErrors(err.response.data)
    }
  }
  return (
    <Form onSubmit={handleSubmit} id='add_author_form'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" rows={3} name='name' value={formData.name} onChange={handleChange} isInvalid={errors.name}/>
        {errors.name && <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group  controlId="validationFormikUsername">
        <Form.Label>Biography</Form.Label>
        <Form.Control
          as="textarea"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          isInvalid={errors.biography}
          style={{ height: '150px' }}
        />
        {errors.biography && <Form.Control.Feedback type="invalid">
          {errors.biography}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <br/>
      <br/>
      <div className="d-grid gap-2">
        <Button variant="outline-secondary" type="submit" >
        Add
        </Button>
      </div>
    </Form>
  )
}


export default UpdateAnAuthor