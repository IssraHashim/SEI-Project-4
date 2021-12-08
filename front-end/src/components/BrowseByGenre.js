import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/esm/Spinner'



const BrowseByGenre = () => {
  const { genre } = useParams()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async() => {
      const { data } = await axios.get('/api/books/')
      const booksGenre = data.filter(book => {
        if (book.genre === genre) {
          return book
        }
      })
      setBooks(booksGenre)
    }
    getBooks()
  }, [genre])


  console.log(books.length)

  return (
    <>
      {books.length ? 
        <CardGroup id='books-cards'>
          <Row xs={1} md={4} className="g-4" id='book_display'>
            {books.map(book => {
              return (

                <Card key={book.id} id='books_card' >
                  <Link to={`/books/${book.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Card.Img variant="top" src={book.image} />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        {book.author.name}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{book.reviews.length} Reviews</small>
                    </Card.Footer>
                  </Link>
                </Card>
              )
            })}
          </Row>
        </CardGroup>
        :
        <div id='loading_state'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden" >Loading...</span>
          </Spinner>
        </div>
      }
    </>
  )
}

export default BrowseByGenre