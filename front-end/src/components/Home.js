import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'


const Home = () => {
  const [books, setBooks] = useState([])

  useEffect(()=> {
    const getData = async()=> {
      const { data } = await axios.get('/api/books')
      setBooks(data)
    }
    getData()

  }, [])

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel variant='dark' activeIndex={index} onSelect={handleSelect}>
      {books.map(book => {
        return (
          <Carousel.Item key={book.id}>
            <img   
              className="d-block w-40"
              src={book.image}
              height="500"
              alt={book.title}
            />
            <Carousel.Caption>
              <h5>{book.title}</h5>
              <p>{book.reviews.length}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>

  )
}

export default Home