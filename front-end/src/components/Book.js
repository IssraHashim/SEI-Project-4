import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { userIsAuthenticated, getPayload, getTokenFromLocalStorage } from '../helpers/auth'
import Cookies from 'js-cookie'
import AddReview from './AddReview'

const Book = () => {
  const csrftoken = Cookies.get('csrftoken')
  const { id } = useParams()
  const [ book, setBook] = useState([])
  const [ author, setAuthor] = useState([])
  const [reviews, setReviews] = useState([])
  const [owner, setOwner] = useState([])
  const [liked, setLiked] = useState(false)
  const [rating, setRating] = useState()
  const [showReview, setShowReview] = useState(false)
  const history = useHistory()

  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(`/api/books/${id}`)
      setBook(data)
      setAuthor(data.author)
      setReviews(data.reviews)
      setOwner(data.owner)
      avgRating(data.reviews)
      const user = getUserData()
      if (!user) return false
      data.followers.some( follower => {
        if (follower.id === user.id) {
          setLiked(true)
        }
      })
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserData = async() => {
    const token = window.localStorage.getItem('token')
    if (!token) throw new Error()
    if (!userIsAuthenticated()) throw new Error()
    const header = { 'Authorization': `Bearer ${token}` }
    const { data } = await axios.get('/api/auth/user', { headers: header },  { headers: { 'X-CSRFToken': csrftoken  } })
    return data

  }

  const addtoCollection = async(event) => {
    const user = await getUserData()
    const { data } = await axios.get(`/api/books/${id}`)
    if (event.target.classList.contains('liked') || event.target.parentElement.classList.contains('liked')) {
      const index = data.followers.indexOf(user.id)
      data.followers.splice(index, 1)
    } else {
      if (data.followers) data.followers = [ ...data.followers, user.id]
      if (!data.followers) data.followers = [user.id]
    }
    if (!data) throw new Error()
    const token = window.localStorage.getItem('token')
    if (!token) throw new Error()
    console.log(data)
    if (!userIsAuthenticated()) throw new Error()
    const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${token}`  }
    const response = await axios.put(`/api/books/${id}/like/`, data, { headers: header } )
    if (!response) throw new Error()
    setLiked(!liked)
  }


  const addReview = () => {
    setShowReview(!showReview)
  }

  const userIsOwner = (currentUserId) => {
    const payload = getPayload()
    if (!payload) return false
    return currentUserId === payload.sub
  }

  const deleteReview = async(reviewId, review) => {
    const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${getTokenFromLocalStorage()}`  }
    await axios.delete(`/api/reviews/${reviewId}/ `, { headers: header })
    const index = reviews.indexOf(review)
    // eslint-disable-next-line no-unused-vars
    const newReviewsArray = [...reviews.splice(index, 1)]
    setReviews([...reviews])
    history.push(`/books/${id}`)
  }


  const deleteBook = async() => {
    const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${getTokenFromLocalStorage()}`  }
    await axios.delete(`/api/books/${id}/`,  { headers: header })
    history.push('/browse')
  }


  const avgRating = (reviews) => {
    if (reviews.length > 0) {
      const allratings = reviews.map(review => review.rating)
      console.log(allratings)
      const average = allratings.reduce((a, b) => (a + b)) / allratings.length
      setRating((average.toFixed(1)))
    }
  }



  return (
    <>
      <Breadcrumb id='breadcrumb_book'>
        <Breadcrumb.Item><Link to ='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to ='/browse' style={{ color: 'inherit', textDecoration: 'inherit' }}> 
          Browse
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{book.title}</Breadcrumb.Item>
      </Breadcrumb>
      <section className="hero-banner" id='book_banner'>
        <div className="container" id='book_container'>
          <div className="row row align-items-center">
            <div className="col" id='book_image_column'>
              <div>
                <img src={book.image} alt={book.image} id='book_image'/>
              </div>
              {userIsAuthenticated() && 
              <div className='my-5'>
                <a href="#" onClick={(event) => addtoCollection(event)} className = {`${liked ? 'liked' : ''} btn btn-outline-light border` }><i className="fas fa-book"></i> {liked ? ' Added to your collection' : ' Add to collection'} </a>
              </div>
              }
            </div>
            <div className="col-lg-6" id='book_info_column'>
              <h3 className="mt-3" id='book_title'>{book.title}</h3>
              <Link to ={`/author/${author.id}`}><h5 className="mt-3">By {author.name}</h5></Link>
              <p className="text mt-3" >{book.genre}</p>
              <p className="text my-4" id='book_text'>{book.description}</p>
              <p className="text" id='book_text'>First published in {book.publication_year}</p>
              {reviews.length > 0 && <p className="text" id='book_text'> Rating {rating} <i className="fas fa-star"></i></p>}
              {userIsOwner(owner.id) && <Button variant='btn btn-outline-light border' onClick={deleteBook} >Delete book</Button>}
            </div>
          </div>
        </div>
      </section>
      <div style={{ display: 'flex' }} >
        <div id='reviews_column'>
          <Accordion defaultActiveKey="0">
            {showReview && <AddReview id={id} setShowReview={setShowReview} setReviews={setReviews}/>}
            {reviews.length > 0 ? reviews.map(review => {
              const newCreated = review.created_at.substring(0,10)
              if (userIsOwner(review.owner.id)) {
                return (
                  <Accordion.Item eventKey="0" key={review.id}>
                    <Accordion.Header>{review.owner.username} - Reviewed on {newCreated} 
                    </Accordion.Header>
                    <Accordion.Body>
                      {review.review}
                      <hr/>
                      {review.rating}
                    </Accordion.Body>
                    <Button onClick={() => deleteReview(review.id, review)}>Delete</Button>
                  </Accordion.Item>
                )
              }
              return (
                <Accordion.Item eventKey="0" key={review.id}>
                  <Accordion.Header>{review.owner.username} - Reviewed on {newCreated} 
                  </Accordion.Header>
                  <Accordion.Body>
                    {review.review}
                    <hr/>
                    {review.rating}
                  </Accordion.Body>
                </Accordion.Item>
              )
            })
              :
              <>
                <div>This book has no reviews. Want to be the first one to add a review?</div>
                {!userIsAuthenticated() &&
                <Button>Register</Button>}
              </>
            }
            
          </Accordion>
        </div>
        <div className='review_button'>
          {userIsAuthenticated() &&
          <Button variant='outline-secondary' onClick={addReview}  style={{ height: '45px' }} ><i className="fas fa-plus"></i> Add A review </Button>
          }
        </div>
      </div>
    </>
  )
}


export default Book