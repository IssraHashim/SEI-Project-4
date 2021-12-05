import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import axios from 'axios'
import Cookies from 'js-cookie'


const Register = () => {
  const csrftoken = Cookies.get('csrftoken')
  const history = useHistory()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })


  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData, { headers: { 'X-CSRFToken': csrftoken  } })
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
      console.log(err.response.data.username)
      setErrors(err.response.data)
    }
  }



  return (
    <Form noValidate onSubmit={handleSubmit} id='register_form'>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationFormik01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormikUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={errors.username}
          />
          {errors.username && <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
          }
        </Form.Group>
          
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationFormik03">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>

            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik04">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image"
            name="profile_image"
            value={formData.image}
            onChange={handleChange}
            isInvalid={errors.profile_image}
          />
          <Form.Control.Feedback type="invalid">
            {errors.profile_image}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationFormik05">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationFormik05">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password Confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            isInvalid={errors.password_confirmation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password_confirmation}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  )
}


export default Register