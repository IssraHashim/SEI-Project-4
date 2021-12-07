import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { ImageUploadField } from './ImageUploadField'
import Cookies from 'js-cookie'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const AddBook = ({ AuthorId, setBooks, setShowAdd }) => {
  const history = useHistory()
  const csrftoken = Cookies.get('csrftoken')
  const [formData, setFormData ] = useState({
    author: AuthorId,
    title: '',
    image: '',
    publication_year: '',
    description: '',
    genre: '',
  })

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors ] = useState({
    author: AuthorId,
    title: '',
    image: '',
    publication_year: '',
    description: '',
    genre: '',
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
      await axios.post('/api/books/', formData, { headers: header })
      history.push(`/author/${AuthorId}`)
      const { data } = await axios.get(`/api/authors/${AuthorId}`)
      setBooks(data.books)
      setShowAdd(false)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" rows={3} name='title' value={formData.title} onChange={handleChange} isInvalid={errors.title}/>
        {errors.title && <Form.Control.Feedback type="invalid">
          {errors.title}
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
        <Form.Label>First Publication Year</Form.Label>
        <Form.Control
          type="text"
          placeholder="publication year"
          aria-describedby="inputGroupPrepend"
          name="publication_year"
          value={formData.publication_year}
          onChange={handleChange}
          isInvalid={errors.publication_year}
        />
        {errors.publication_year && <Form.Control.Feedback type="invalid">
          {errors.publication_year}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name='description' value={formData.description} onChange={handleChange} isInvalid={errors.description}/>
        {errors.description && <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group>
        <Form.Label>Genre: {formData.genre}</Form.Label>
        <Form.Select aria-label="Default select example" name='genre' onChange={handleChange} isInvalid={errors.genre}>
          <option disabled selected>Select a genre</option>
          <option value='Biography'>Biography</option>
          <option value="Business">Business</option>
          <option value="Classics">Classics</option>
          <option value="Comics">Comics</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Fiction">Fiction</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Memoir">Memoir</option>
          <option value="Mystery">Mystery</option>
          <option value="Nonfiction">Nonfiction</option>
          <option value="Poetry">Poetry</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Thriller">Thriller</option>
          <option value="Young Adults">Young Adults</option>
        </Form.Select>
        {errors.genre && <Form.Control.Feedback type="invalid">
          {errors.genre}
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


export default AddBook