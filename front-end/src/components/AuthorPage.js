import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { userIsAuthenticated, getPayload, getTokenFromLocalStorage } from '../helpers/auth' 
import Cookies from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import AddBook from './AddBook'

const AuthorPage = () => {
  const [liked, setLiked] = useState(false)
  const [author, setAuthor] = useState([])
  const [books, setBooks] = useState([])
  const [owner, setOwner] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const csrftoken = Cookies.get('csrftoken')



  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(`/api/authors/${id}`)
      setAuthor(data)
      setBooks(data.books)
      setOwner(data.owner)
      const user = await getUserData()
      if (!user) return false
      data.followers.some( follower => {
        if (follower.id === user.id) {
          setLiked(true)
        }
      })
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getUserData = async() => {
    try {
      const token = window.localStorage.getItem('token')
      if (!token) throw new Error()
      if (!userIsAuthenticated()) throw new Error()
      const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${token}`  }
  
      const { data } = await axios.get('/api/auth/user', { headers: header })
      return data
    } catch (err) {
      return 
    }


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


  const addAbook = () => {
    setShowAdd(!showAdd)
  }

  const userIsOwner = (currentUserId) => {
    console.log(currentUserId)
    const payload = getPayload()
    if (!payload) return false
    return currentUserId === payload.sub
  }

  const deleteAuthor = async() => {
    const header = { 'X-CSRFToken': csrftoken, 'Authorization': `Bearer ${getTokenFromLocalStorage()}`  }
    await axios.delete(`/api/authors/${id}/`,  { headers: header })
    history.push('/browse')
  }



  return (
    <>
      { author.name ? 
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
          <section className="hero-banner" id='book_banner' style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) ), url(${author.image})` }}>
            <div className="container" id='book_container'>
              <div className="row row align-items-center">
                <div className="col" id='book_image_column'>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={author.image} alt={author.image} id='author_image'/>
                  </div>
                  {userIsAuthenticated() && 
                  <div className='my-5' style={{ margin: '25px', display: 'flex', flexDirection: 'column' }}>
                    <a href="#" onClick={(event) => followAuthor(event)} className = {`${liked ? 'liked' : ''} btn btn-outline-light border` }><i className="fas fa-feather-alt"></i> {liked ? ' Following' : ' Follow '} </a>
                  </div>
                  }
                </div>
                <div className="col-lg-6" id='book_info_column'>
                  <h3 className="mt-3" id='book_title'>{author.name}</h3>
                  <p className="text my-4" id='book_text'>{author.biography}</p>
                  {userIsOwner(owner.id) && <Button variant='btn btn-outline-light border' onClick={deleteAuthor} >Delete book</Button>}            
                </div>
              </div>
            </div>
          </section>
          {userIsAuthenticated() && <Button  variant='outline-secondary' style={{ margin: '20px 0 10px 30px' }} onClick={addAbook}>Add A book from this author</Button>}
          {showAdd && <AddBook  AuthorId={author.id} setBooks={setBooks} setShowAdd={setShowAdd}/>}
          <Row xs={1} md={4} className="g-4" id='book_display2'>
            {books.map((book) => {
              return (
                <Card style={{ width: '13rem' }} key={book.id} id='books_card'>
                  <Link to={`/books/${book.id}`}>
                    <Card.Img variant="top" src={book.image} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '15px' , fontWeight: '700' }}>{book.title}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
                // </Col>
              )
            })}
          </Row>
        </>
        :
        <div id='loading_state' style={{ height: '635px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden" >Loading...</span>
          </Spinner>
        </div>
      }
    </>
  )
}


export default AuthorPage