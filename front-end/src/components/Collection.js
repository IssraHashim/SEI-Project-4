import React, { useEffect, useState } from 'react'
import { userIsAuthenticated } from '../helpers/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import AddanAuthor from './AddanAuthor'

const Collection = () => {
  const csrftoken = Cookies.get('csrftoken')
  const [yourBooks, setYourbooks] = useState([])
  const [yourAuthors, setYourAuthors] = useState([])
  const [addAuthor, setAddAuthor] = useState(false)


  useEffect(()=> {
    const getUserData = async() => {
      const token = window.localStorage.getItem('token')
      if (!token) throw new Error()
      if (!userIsAuthenticated()) throw new Error()
      const header = { 'Authorization': `Bearer ${token}` }
      const { data } = await axios.get('/api/auth/user', { headers: header },  { headers: { 'X-CSRFToken': csrftoken  } })
      setYourbooks(data.liked_books)
      setYourAuthors(data.liked_authors)
    }
    getUserData()
  }, [])


  const handleClick = () => {
    setAddAuthor(!addAuthor)
  }

  console.log(yourAuthors)
  return (
    <>
      <h2>Your Collection</h2>
      <br/>
      <h4>Action</h4>
      <Button variant='outline-secondary' onClick={handleClick} style={{ marginLeft: '20px' }}><i className="fas fa-feather-alt"></i> Add a new Author</Button>
      { addAuthor && <AddanAuthor />}
      <hr/>
      <h4>Your saved Books</h4>
      <hr/>
      <Row xs={1} md={4} className="g-4" id='book_display'>
        {yourBooks.map((book) => {
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
      <hr/>
      <h4>Followed Authors</h4>
      <Row xs={1} md={4} className="g-4" id='book_display'>
        {yourAuthors.map((author) => {
          return (
            <Col key={author.id}>
              <Link to={`/author/${author.id}`}>
                <Card style={{ width: '13rem' }} >
                  <Card.Img variant="top" src={author.image} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: '15px' , fontWeight: '700' }}>{author.name}</Card.Title>
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


export default Collection