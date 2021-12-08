import React, { useEffect, useState } from 'react'
import { userIsAuthenticated } from '../helpers/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useHistory } from 'react-router-dom'

const Settings = () => {
  const csrftoken = Cookies.get('csrftoken')
  const [userData, setUserData] = useState([])
  const [show, setShow] = useState(false)
  const history = useHistory()

  useEffect(()=> {
    const getUserData = async() => {
      const token = window.localStorage.getItem('token')
      if (!token) throw new Error()
      if (!userIsAuthenticated()) throw new Error()
      const header = { 'Authorization': `Bearer ${token}` }
      const { data } = await axios.get('/api/auth/user', { headers: header },  { headers: { 'X-CSRFToken': csrftoken  } })
      setUserData(data)
      console.log(data)
    }
    getUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleDelete = async() => {
    const token = window.localStorage.getItem('token')
    if (!token) throw new Error()
    if (!userIsAuthenticated()) throw new Error()
    const header = { 'Authorization': `Bearer ${token}` }
    await axios.delete('/api/auth/user', { headers: header },  { headers: { 'X-CSRFToken': csrftoken  } })
    window.localStorage.removeItem('token')
    history.push('/')
  }


  console.log(userData)
  return (
    <>
      { userData.email ? 
        <>
          <h2>settings</h2>
          <div>
            <h4>Email: {userData.email}</h4>
            <hr/>
            <h4>Username: {userData.username}</h4>
            <hr/>
            <Button onClick={() => setShow(!show)}>Delete your Account</Button>
            {show && 
        <>
          <p>Are you sure you want to delete your account at Bookopedia?</p>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={()=> setShow(false) }>No</Button>
        </>
            }
          </div>
        </>
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

export default Settings