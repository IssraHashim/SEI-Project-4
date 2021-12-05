import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Accordion from 'react-bootstrap/Accordion'
import { userIsAuthenticated } from '../helpers/auth'


const Book = () => {

  const { id } = useParams()
  const [ book, setBook] = useState([])
  const [ author, setAuthor] = useState([])
  const [reviews, setReviews] = useState([])


  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(`/api/books/${id}`)
      setBook(data)
      setAuthor(data.author)
      setReviews(data.reviews)
    }
    
    getData()
  }, [id])

  console.log(book)
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
                <a href="#" className="btn btn-outline-light border"><i className="fas fa-book"></i> Add to collection</a>
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