import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Logo from '../assets/download.png'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/fontawesome-free-solid'



const MyNavbar = () => {
  const [click, setClick] = useState(false)
  // const userLogo = <FontAwesomeIcon icon={faUser} /> 
  const message = 'Log in / Register'
  // const messageCombined = 
  // console.log(messageCombined)
  const handleClick = () => {
    setClick(!click)
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">  
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
            <Nav.Link href="#action1">Browse</Nav.Link>
            <Nav.Link href="#action2">Genre</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Row >
              <NavDropdown href="#action6" onClick={handleClick} title={ <FontAwesomeIcon icon={faUser} /> , message}  >{handleClick &&
                <Dropdown.Menu align="end">
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label column sm="2">
                        Email
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="email@example.com" />
                      </Col>
                    </Form.Group>
          
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="2">
                        Password
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control type="password" placeholder="Password" />
                      </Col>
                    </Form.Group>
                  </Form>
                </Dropdown.Menu>
              }
              </NavDropdown>
              <Col >
                <Nav.Link>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Nav.Link>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar