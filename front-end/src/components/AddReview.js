import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'
import { getTokenFromLocalStorage } from '../helpers/auth'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const AddReview = ({ id, setShowReview, setReviews }) => {
  const history = useHistory()
  const csrftoken = Cookies.get('csrftoken')
  const [formData, setFormData] = useState({
    book: id,
    review: '',
    rating: null,
  })

  const [errors, setErrors ] = useState({
    review: '',
    rating: '',
  })

  const handleChange = (event) => {
    setFormData( { ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event)=> {
    event.preventDefault()
    try {
      const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${getTokenFromLocalStorage()}`  }
      await axios.post('/api/reviews/', formData, { headers: header })
      history.push(`/books/${id}`)
      const { data } = await axios.get(`/api/books/${id}`)
      setShowReview(false)
      setReviews(data.reviews)

    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <Form onSubmit={handleSubmit} id='add_review_form'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Review</Form.Label>
        <Form.Control style={{ backgroundColor: '#EAE7DC' }} as="textarea" rows={3} name='review' value={formData.review} onChange={handleChange} isInvalid={errors.review}/>
        {errors.review && <Form.Control.Feedback type="invalid">
          {errors.review}
        </Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Rating</Form.Label>
        <div className="mb-3">
          { formData.rating !== '1' &&  formData.rating !== null ? 
            <Form.Check
              inline
              disabled
              label="1"
              name="rating"
              type='checkbox'
              value='1'
              onClick={handleChange}
            />
            :
            <Form.Check
              inline
              label="1"
              name="rating"
              type='checkbox'
              value='1'
              onClick={handleChange}
              isInvalid={errors.rating}
            />
          }
          { formData.rating !== '2' &&  formData.rating !== null ? 
            <Form.Check
              inline
              disabled
              label="2"
              name="rating"
              type='checkbox'
              value='2'
              onClick={handleChange}
            />
            :
            <Form.Check
              inline
              label="2"
              name="rating"
              type='checkbox'
              value='2'
              onClick={handleChange}
              isInvalid={errors.rating}
            />
          }
          { formData.rating !== '3' &&  formData.rating !== null ?
            <Form.Check
              inline
              disabled
              label="3"
              name="rating"
              type='checkbox'
              value='3'
              onClick={handleChange}
            /> 
            :   
            <Form.Check
              inline
              label="3"
              name="rating"
              type='checkbox'
              value='3'
              onClick={handleChange}
              isInvalid={errors.rating}
            />
          }
          { formData.rating !== '4' &&  formData.rating !== null ?     
            <Form.Check
              inline
              disabled
              label="4"
              name="rating"
              type='checkbox'
              value='4'
            />
            :
            <Form.Check
              inline
              label="4"
              name="rating"
              type='checkbox'
              value='4'
              onClick={handleChange}
              isInvalid={errors.rating}
            />
          }
          { formData.rating !== '5' &&  formData.rating !== null ? 
            <Form.Check
              inline
              disabled
              label="5"
              name="rating"
              type='checkbox'
              value='5'
              onClick={handleChange}
            />
            :
            <Form.Check
              inline
              label="5"
              name="rating"
              type='checkbox'
              value='5'
              onClick={handleChange}
              isInvalid={errors.rating}
            />
          }
        </div>
        <div className="d-grid gap-2">
          <Button variant="outline-secondary" type="submit" >
          Submit
          </Button>
        </div>
      </Form.Group>
    </Form>
  )
}


export default AddReview
