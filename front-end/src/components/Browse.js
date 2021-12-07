import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import CardGroup from 'react-bootstrap/CardGroup'
import { Link } from 'react-router-dom'

const Browse = () => {

  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])


  useEffect(()=> {
    const getData = async() => {
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
    }
    getData()
  }, [])



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
      <CardGroup id='books-cards'>
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
      </CardGroup>
    </>
  )
}

export default Browse