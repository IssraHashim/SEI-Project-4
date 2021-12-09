import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import CardGroup from 'react-bootstrap/CardGroup'
import { Link, useLocation } from 'react-router-dom'
import * as QueryString from 'query-string'




const Browse = () => {

  const [books, setBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [genres, setGenres] = useState([])
  const props = useLocation()
  const params = QueryString.parse(props.search)
  const [filteredresults, setFilteredResults] = useState([])
  // const [reviews, setReviews ] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [ratings, setRatings ] = useState([])
  const [checked, setChecked ] = useState(false)
  const [checked2, setChecked2 ] = useState(false)
  const [checked3, setChecked3 ] = useState(false)
  const [checked4, setChecked4 ] = useState(false)
  const [checked5, setChecked5 ] = useState(false)

  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get('/api/books/')
      setBooks(data)
      setAllBooks(data)
      const allreviews = data.map(book => book.reviews)
      // setReviews(allreviews)
      getRatings(allreviews)
      const newArray = []
      for (let i = 0; i < data.length; i++) {
        let justgenres = false
        justgenres = newArray.some(genre => {
          return (genre.genre === data[i].genre )
        })
        if (!justgenres) newArray.push(data[i])
      }
      setGenres(newArray)

      let filtered = null
      filtered = data.filter( search => {
        return (
          search.title.toLowerCase().includes(params.search) 
          
        )
      })
      setFilteredResults(filtered)

    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  
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
              return book 
            }
          })
          newBooksArray.push(newbooks[0])
        }
      }
      setBooks(newBooksArray)
    } else {
      setBooks(allBooks)
    }

  }
  return (
    <>
      { books.length ? 
        <>
          <br/>
          <h4 style={{ padding: '20px' }}>Browse by Genre</h4>
          <hr style={{ color: 'lightgrey' }}/>
          <br/>
          <Row id='genre_cards'>
            {genres.map(book => {
              return (
                <Card key={book.id} className="text-center" border="light" id='genre_card'>
                  <Link to= {`/browse/${book.genre}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Card.Img variant="top" src={book.image} id='genre_image'/>
                    <Card.Body>{book.genre}</Card.Body>
                  </Link>
                </Card>
              )  
            })
            }
          </Row>
          <br/>
          <hr/>
          {filteredresults.length > 0 ?
            <>
              <CardGroup id='books-cards'>
                <Row xs={1} md={4} className="g-4" id='book_display'>
                  {filteredresults.map(book => {
                    return (
                      <Card key={book.id} id='books_card'style={{ width: '13rem' }}  >
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
            </>
            :
            <>
              { params.search ? 
                <>
                  <h3>There are no results for your search,<br/> please try searching for something else </h3> 
                  <hr/>
                </>
                : 
                <h2></h2>
              } 
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

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <CardGroup id='books-cards'>
                    <Row xs={1} md={4} className="g-4" id='book_display'>
                      {books.map(book => {
                        return (
                          <Card key={book.id} id='books_card' >
                            <Link to={`/books/${book.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                              <Card.Img variant="top" src={book.image} id='browse_book_image'/>
                              <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text className='text-muted' style ={{ fontStyle: 'italic' }}>
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
              </div>
            </>
          }
        </>
        :
        <>
          <div id='loading_state'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden" >Loading...</span>
            </Spinner>
          </div>
        </>
      }
    
    </>
  )
}

export default Browse