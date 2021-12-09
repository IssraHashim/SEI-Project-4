import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Logo from '../assets/download-1.png'
import Col from 'react-bootstrap/esm/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/fontawesome-free-solid'
import axios from 'axios'
import Cookies from 'js-cookie'
// import Register from './Register'
import { userIsAuthenticated } from '../helpers/auth'
import { useHistory, useLocation, Link } from 'react-router-dom'

// import { getToken } from '../auth.js'

const MyNavbar = () => {
  const csrftoken = Cookies.get('csrftoken')
  const [formData, setFormData] = useState( {
    email: '',
    password: '',
  } )

  // const [show, setShow] = useState(false)
  const [errors, setErrors] = useState(false)
  const [welcomeBack, setWelcomeBack] = useState('')
  const [click, setClick] = useState(false)
  const userLogo = <FontAwesomeIcon icon={faUser} /> 
  const history = useHistory()
  const location = useLocation()
  const [genres, setGenres] = useState([])




  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get('/api/books/')
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
  }, [location.pathname])



  const handleClick = () => {
    setClick(!click)
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
      history.push('/')
    } catch (err) {
      setErrors(true)
    }
      
  }

  return (
    <Navbar id='navbar_full' expand="lg">
      <Container fluid>
        <Navbar.Brand> 
          <Link to='/'>
            <img
              src={Logo}
              height="60"
              className="d-inline-block align-top"
              alt="Bookopedia logo"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link to="/browse" style={{ color: 'inherit', textDecoration: 'inherit' }}>Browse</Link></Nav.Link>
            <NavDropdown variant="light"autoClose="outside" title='Genre'       id="dropdown-menu-align-responsive-1" > 
              {genres.map(book => {
                return (
                  <NavDropdown.Item key={book.id} className='mb-0 pb-0' >
                    <Link to={`/browse/${book.genre}`} style={{ color: 'inherit', textDecoration: 'inherit' }} ><Col key={book.id} id='genre_popover'>{book.genre}</Col></Link>
                  </NavDropdown.Item>
                )
              })}
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {userIsAuthenticated() ?
              <>
                <Navbar.Text>{welcomeBack}</Navbar.Text>
                <NavDropdown autoClose="outside" id="dropdown-autoclose-outside" align="end" className='logindropdown' onClick={handleClick} title={userLogo} >
                  <NavDropdown.Item ><Link to='/collection'>Your Collection</Link></NavDropdown.Item>
                  <NavDropdown.Item ><Link to='/settings'>Settings</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5" onClick={handleLogOut}>
                      Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
              :
              <>
                <NavDropdown autoClose="outside" id="dropdown-autoclose-outside" align="end" className='logindropdown' onClick={handleClick} title='Log in'  >{handleClick &&
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
                  </>
                }
                </NavDropdown>
                <Link to='/register'><Button >Register</Button></Link>
              </>
            }
            
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar