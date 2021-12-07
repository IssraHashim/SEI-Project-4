import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import CardGroup from 'react-bootstrap/CardGroup'
import { Link, useLocation } from 'react-router-dom'
import * as QueryString from 'query-string'

const Browse = () => {

  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const props = useLocation()
  const params = QueryString.parse(props.search)
  const [filteredresults, setFilteredResults] = useState([])

  useEffect(()=> {
    const getData = async() => {
      console.log(filteredresults)
      const { data } = await axios.get('/api/books/')
      setBooks(data)
      // const getGenres = data.filter(book => {
      //   return book.genre
      // })
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

  
  console.log((params.search.length))
  return (
    <>
      <br/>
      <h3>Browse by Genre</h3>
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
        :
        <>
          { params.search.length ? 
            <>
              <h3>There were no results for your search,<br/> please try searching for something else </h3> 
              <hr/>
            </>
            : 
            <h2></h2>
          } 
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
        </>
      }
 
    </>
  )
}

export default Browse