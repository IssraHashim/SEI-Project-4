import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Logo from '../assets/download.png'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/fontawesome-free-solid'
import axios from 'axios'
import Cookies from 'js-cookie'
import { userIsAuthenticated } from '../helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import * as QueryString from 'query-string'

// import { getToken } from '../auth.js'

const MyNavbar = () => {
  const csrftoken = Cookies.get('csrftoken')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState(false)
  const [welcomeBack, setWelcomeBack] = useState('')
  const [click, setClick] = useState(false)
  const [search, setSearch ] = useState({})
  const userLogo = <FontAwesomeIcon icon={faUser} /> 
  const history = useHistory()
  const location = useLocation()




  useEffect(()=> {

  }, [location.pathname])



  const handleClick = () => {
    setClick(!click)
  }

  const handleSearch = (event) => {
    setSearch({ ...search, search: event.target.value.toLowerCase() })
  }

  const startNewSearch = () => {
    return `?${QueryString.stringify(search)}`
  }

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }


  const setItemToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  const handleSubmit = async() => {
    try {
      const { data } = await axios.post('/api/auth/login/', formData, 
        { headers: { 'X-CSRFToken': csrftoken  } } )
      setItemToLocalStorage(data.token)
      setWelcomeBack(data.message)
    } catch (err) {
      setErrors(true)
    }
      
  }

  console.log(csrftoken)
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">  
          <img
            src={Logo}
            height="60"
            className="d-inline-block align-top"
            alt="Bookopedia logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='browse'>Browse</Nav.Link>
            <Nav.Link >Genre</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Row >
              {userIsAuthenticated() ?
                <>
                  <Navbar.Text>{welcomeBack}</Navbar.Text>
                  <NavDropdown autoClose="outside" id="dropdown-autoclose-outside" align="end" className='logindropdown' onClick={handleClick} title={userLogo}  >
                    <NavDropdown.Item href="#action3">Book Collection</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Follows</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5" onClick={handleLogOut}>
                        Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                :
                <NavDropdown autoClose="outside" id="dropdown-autoclose-outside" align="end" className='logindropdown' onClick={handleClick} title='Log in / Register'  >{handleClick &&
                  <>
                    <Dropdown.Item>
                      <Form >
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                          <Form.Label column sm="2">
                            Email
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} value={formData.email}/>
                            {errors && <p>your username or password is incorrect</p>}

                          </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                          <Form.Label column sm="2">
                            Password
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={formData.password}/>
                            {errors && <p>your username or password is incorrect</p>}
                          </Col>
                        </Form.Group>
                        <Button type="submit" onClick={handleSubmit}>Sign in</Button>
                      </Form>
                    </Dropdown.Item>
                    <hr/>
                    <Dropdown.Item>
                      <p>Not a User? Register now!</p>
                      <Button >Register</Button>
                    </Dropdown.Item>
                  </>
                }
                </NavDropdown>
              }
              <Col >
                <InputGroup>
                  <Form className="d-flex">
                    <FormControl
                      placeholder="Start your search"
                      className="me-2"
                      // aria-label="Search"
                      onChange={handleSearch}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-success" onClick={startNewSearch} >Search</Button>
                  </Form>
                </InputGroup>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar