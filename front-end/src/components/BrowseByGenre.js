import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/esm/Spinner'



const BrowseByGenre = () => {
  const { genre } = useParams()
  const [books, setBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [ratings, setRatings ] = useState([])
  const [checked, setChecked ] = useState(false)
  const [checked2, setChecked2 ] = useState(false)
  const [checked3, setChecked3 ] = useState(false)
  const [checked4, setChecked4 ] = useState(false)
  const [checked5, setChecked5 ] = useState(false)
  const [ results, setResults ] = useState('')

  useEffect(() => {
    const getBooks = async() => {
      const { data } = await axios.get('/api/books/')
      const booksGenre = data.filter(book => {
        if (book.genre === genre) {
          return book
        }
      })
      const allreviews = data.map(book => book.reviews)
      getRatings(allreviews)
      setBooks(booksGenre)
      setAllBooks(booksGenre)
    }
    getBooks()
  }, [genre])



  const getRatings = (reviews) => {
    const bookandRating = []
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].length > 0) {
        const allratings = reviews[i].map(review => review.rating)
        const allbooks = reviews[i].find(review => review.book)
        const average = allratings.reduce((a, b) => (a + b)) / allratings.length
        bookandRating.push([allbooks, average.toFixed(1)])
      }
      setRatings(bookandRating)
    }
  }


  const handleClick = (event) => {
    if (event.target.name === '1' ) {
      setChecked(!checked)
    } else if (event.target.name === '2') {
      setChecked2(!checked2)
    } else if (event.target.name === '3') {
      setChecked3(!checked3)
    } else if (event.target.name === '4') {
      setChecked4(!checked4)
    } else if (event.target.name === '5') {
      setChecked5(!checked5)
    }

    if (!checked && !checked2  && !checked3 && !checked4 && !checked5) {
      const newBooksArray = []
      for (let i = 0; i < ratings.length; i++) {
        if (ratings[i][1] >= event.target.name ) {
          const newbooks = books.filter(book => {
            if (book.id === ratings[i][0].book) {
              console.log(book)
              return book 
            }
          })
          if (newbooks.length > 0) {
            newBooksArray.push(newbooks[0])
          }
        }
      }
      if (newBooksArray.length > 0) {
        setBooks(newBooksArray)
        setResults('')
      }
      setResults('There are no results for your search')
    } else {
      setBooks(allBooks)
      setResults('')
    }
  }
  



  return (
    <>
      {books.length ? 
        <>
          <br/>
          <h4 style={{ padding: '20px 0 20px 60px' }}>{genre}</h4>
          <hr style={{ color: 'darkgrey' }}/>
          <br/>
          <section style={{ display: 'flex' }}>
            <div id='browse_books_content'>
              <div  id='browse_filter_column'>
                <div>FILTER BY</div>
                <hr/>
                <div>Rating</div>
                <br/>
                <div key='checkbox' className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Form.Check
                    inline
                    label="1"
                    name="1"
                    type='checkbox'
                    onClick={handleClick}
                    checked={checked}
                  />
                  <Form.Check
                    inline
                    label="2"
                    name="2"
                    type='checkbox'
                    onClick={handleClick}
                    checked={checked2}
                  />
                  <Form.Check
                    inline
                    label="3"
                    name="3"
                    type='checkbox'
                    onClick={handleClick}
                    checked={checked3}
                  />
                  <Form.Check
                    inline
                    label="4"
                    name="4"
                    type='checkbox'
                    onClick={handleClick}
                    checked={checked4}

                  />
                  <Form.Check
                    inline
                    label="5"
                    name="5"
                    type='checkbox'
                    onClick={handleClick}
                    checked={checked5}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }} >{results}</div>
              <hr style={{ color: 'darkgrey' }}/>
              <CardGroup id='books-cards'>
                <Row xs={1} md={4} className="g-4" id='book_display'>
                  {books.map(book => {
                    return (
                      <Card key={book.id} id='books_card' >
                        <Link to={`/books/${book.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                          <Card.Img variant="top" src={book.image} />
                          <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text style ={{ fontStyle: 'italic', fontSize: '15px' }}>
                              {book.author.name}
                              <br/>
                              {book.reviews.length} Reviews
                            </Card.Text>
                          </Card.Body>
                        </Link>
                      </Card>
                    )
                  })}
                </Row>
              </CardGroup>
            </div>
          </section>
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

export default BrowseByGenre