import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Accordion from 'react-bootstrap/Accordion'
import { userIsAuthenticated } from '../helpers/auth'
import Cookies from 'js-cookie'


const Book = () => {
  const csrftoken = Cookies.get('csrftoken')
  const { id } = useParams()
  const [ book, setBook] = useState([])
  const [ author, setAuthor] = useState([])
  const [reviews, setReviews] = useState([])
  const [liked, setLiked] = useState(false)


  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(`/api/books/${id}`)
      setBook(data)
      setAuthor(data.author)
      setReviews(data.reviews)
      const user = getUserData()
      if (!user) return false
      if (!data.followers.includes(user.id)) {
        setLiked(false)
        return false
      }
    }
    
    getData()
  }, [id])

  const getUserData = async() => {
    const token = window.localStorage.getItem('token')
    if (!token) throw new Error()
    if (!userIsAuthenticated()) throw new Error()
    const header = { 'Authorization': `Bearer ${token}` }
    const { data } = await axios.get('api/auth/user', { headers: header },  { headers: { 'X-CSRFToken': csrftoken  } })
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
    const response = await axios.put(`api/books/${id}/like/`, data, { headers: header } )
    if (!response) throw new Error()
    setLiked(!liked)
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
                <a href="#" onClick={(event) => addtoCollection(event)} className = {`${liked ? 'liked' : ''} btn btn-outline-light border` } ><i className="fas fa-book"></i>{liked ? 'Added to your collection' : 'Add to collection'} </a>
              </div>
              }
            </div>
            <div className="col-lg-6" id='book_info_column'>
              <h3 className="mt-3" id='book_title'>{book.title}</h3>
              <h5 className="mt-3">By {author.name}</h5>
              <p className="text mt-3" >{book.genre}</p>
              <p className="text my-4" id='book_text'>{book.description}</p>
              <p className="text" id='book_text'>First published in {book.publication_year}</p>
              
            </div>
          </div>
        </div>
      </section>
      <Accordion defaultActiveKey="0">
        {reviews.length > 0 ? reviews.map(review => {
          const newCreated = review.created_at.substring(0,10)
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
            { userIsAuthenticated() ? 
              <button>Add A review </button>
              :
              <button>Register to add a review</button>
            }
          </>
        }
        
      </Accordion>
    </>
  )
}


export default Book