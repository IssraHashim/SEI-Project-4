import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Link } from 'react-router-dom'
import FirstImage from '../assets/book_homepage.jpg'
import SecondImage from '../assets/library.jpg'
import * as QueryString from 'query-string'


const Home = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch ] = useState({})

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

  const handleSearch = (event) => {
    setSearch({ ...search, search: event.target.value.toLowerCase() })
  }

  const startNewSearch = () => {
    return `?${QueryString.stringify(search)}`
  }


  return (
    <>
      {books.length ? 
        <Carousel  activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item interval={5000}>
            <img   
              className="d-block w-40"
              src={FirstImage}
              height="500"
              alt='books'
              id='home_book_image_1'
            />
            <div >
              <div id='homepage_text'> Welcome to Bookopedia</div>
              <br/>
              <div id='homepage_caption'>Here you will find all your favorite books and reviews by our bookadvisors. Create an account today so you can follow all your favorite authors and create a book collection to keep track of your next read!</div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div >
              <div id='homepage_text'>Book Reviews</div>
              <br/>
              <div id='homepage_caption'>Look at {books.length} books and their reviews. Let our community of bookwarms help you find what your next book is.</div>
            </div>

            <img   
              className="d-block w-40"
              src={SecondImage}
              height="500"
              alt='old-books'
              id='home_book_image_1'
            />

          </Carousel.Item>
        </Carousel>

        :
        <div id='loading_state'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden" >Loading...</span>
          </Spinner>
        </div>
      }
      <div >
        <InputGroup id='search_div'>
          <Form className="d-flex">
            <FormControl
              placeholder="Seach for a book..."
              className="me-2"
              onChange={handleSearch}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style={{ backgroundColor: '#d8c3a561' }}
            />
            <Link to={`/browse${startNewSearch()}`}><Button variant="outline-secondary" onClick={startNewSearch} >Search</Button></Link>
          </Form>
        </InputGroup>
      </div>
    </>
  )
}

export default Home