import React, { useEffect, useState } from 'react'
import { userIsAuthenticated } from '../helpers/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import AddanAuthor from './AddanAuthor'
import Spinner from 'react-bootstrap/esm/Spinner'

const Collection = () => {
  const csrftoken = Cookies.get('csrftoken')
  const [yourBooks, setYourbooks] = useState([])
  const [yourAuthors, setYourAuthors] = useState([])
  const [addAuthor, setAddAuthor] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(()=> {
    const getUserData = async() => {
      const token = window.localStorage.getItem('token')
      if (!token) throw new Error()
      if (!userIsAuthenticated()) throw new Error()
      const header = { 'Authorization': `Bearer ${token}` }
      const { data } = await axios.get('/api/auth/user', { headers: header },  { headers: { 'X-CSRFToken': csrftoken  } })
      setYourbooks(data.liked_books)
      setYourAuthors(data.liked_authors)
      setLoading(false)
    }
    getUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleClick = () => {
    setAddAuthor(!addAuthor)
  }

  return (
    <>
      { loading ?
        <div id='loading_state' style={{ height: '635px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden" >Loading...</span>
          </Spinner>
        </div>
        :
        <>
          <br/>
          <h2 style={{ padding: '20px 0 20px 60px' }}>Your Collection</h2>
          <br/>
          <h4 style={{ padding: '20px 0 0px 60px' }}>Action</h4>
          {/* <hr style={{ color: 'darkgrey' }}/> */}
          <Button variant='outline-secondary' onClick={handleClick} style={{ margin: '20px 0 20px 80px' }}><i className="fas fa-feather-alt"></i> Add a new Author</Button>
          { addAuthor && <AddanAuthor />}
          <hr style={{ color: 'darkgrey' }}/>
          <h4 style={{ padding: '20px 0 20px 60px' }}>Your saved Books</h4>
          <Row xs={1} md={4} className="g-4" id='book_display3'>
            {yourBooks.map((book) => {
              return (
                <Card key={book.id} style={{ width: '10rem' }} id='books_card' >
                  <Link to={`/books/${book.id}`} >
                    <Card.Img variant="top" src={book.image} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '15px' , fontWeight: '700' }}>{book.title}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              )
            })}
          </Row>
          <hr style={{ color: 'darkgrey' }}/>
          <h4 style={{ padding: '20px 0 20px 60px' }}>Followed Authors</h4>
          <Row xs={1} md={4} className="g-4" id='book_display3'>
            {yourAuthors.map((author) => {
              return (
                <Card style={{ width: '10rem' }} key={author.id} id='books_card' >
                  <Link to={`/author/${author.id}`}>
                    <Card.Img variant="top" src={author.image} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '15px' , fontWeight: '700' }}>{author.name}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              )
            })}
          </Row>
        </>
      }
    </>
  )
}


export default Collection