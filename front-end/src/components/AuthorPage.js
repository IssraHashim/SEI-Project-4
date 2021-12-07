import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { userIsAuthenticated } from '../helpers/auth' 
import Cookies from 'js-cookie'


const AuthorPage = () => {
  const [liked, setLiked] = useState(false)
  const [author, setAuthor] = useState([])
  const [books, setBooks] = useState([])
  const { id } = useParams()
  const csrftoken = Cookies.get('csrftoken')



  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(`/api/authors/${id}`)
      setAuthor(data)
      setBooks(data.books)
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
    const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${token}`  }

    const { data } = await axios.get('/api/auth/user', { headers: header })
    return data

  }

  const followAuthor = async(event) => {
    const user = await getUserData()
    const { data } = await axios.get(`/api/authors/${id}`)
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
    const response = await axios.put(`/api/authors/${id}/like/`, data, { headers: header } )
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
        <Breadcrumb.Item active>{author.title}</Breadcrumb.Item>
      </Breadcrumb>
      <section className="hero-banner" id='book_banner'>
        <div className="container" id='book_container'>
          <div className="row row align-items-center">
            <div className="col" id='book_image_column'>
              <div>
                <img src={author.image} alt={author.image} id='author_image'/>
              </div>
              {userIsAuthenticated() && 
              <div className='my-5'>
                <a href="#" onClick={(event) => followAuthor(event)} className = {`${liked ? 'liked' : ''} btn btn-outline-light border` }><i className="fas fa-feather-alt"></i> {liked ? ' Following' : ' Follow '} </a>
              </div>
              }
            </div>
            <div className="col-lg-6" id='book_info_column'>
              <h3 className="mt-3" id='book_title'>{author.name}</h3>
              <p className="text my-4" id='book_text'>{author.biography}</p>            
            </div>
          </div>
        </div>
      </section>
      <Row xs={1} md={4} className="g-4" id='book_display'>
        {books.map((book) => {
          return (
            <Col key={book.id}>
              <Link to={`/books/${book.id}`}>
                <Card style={{ width: '13rem' }} >
                  <Card.Img variant="top" src={book.image} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: '15px' , fontWeight: '700' }}>{book.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </>
  )
}


export default AuthorPage