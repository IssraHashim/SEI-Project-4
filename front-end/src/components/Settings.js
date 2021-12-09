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
        <section style={{ height: '635px' }}>
          <br/>
          <h2 style={{ textAlign: 'center', padding: '30px 0 100px 0' }}>Your Bookopedia Settings</h2>
          <div>
            <h4 style={{ textAlign: 'center', padding: '20px 0 20px 0' }}>Email :  {userData.email}</h4>
            <hr style={{ color: 'darkgrey' }}/>
            <h4 style={{ textAlign: 'center', padding: '20px 0 20px 0' }}>Username : {userData.username}</h4>
            <hr style={{ color: 'darkgrey' }}/>
            <div id='delete_account_button'>
              <Button id='settings_delete_button' onClick={() => setShow(!show)}>Delete your Account</Button>
            </div>
            {show && 
        <>
          <p style={{ textAlign: 'center', padding: '10px 0 10px 0' }}>Are you sure you want to delete your account at Bookopedia?</p>
          <div id='delete_account_button'>
            <Button  id='settings_delete_button' onClick={handleDelete}>Yes</Button>
            <Button  id='settings_delete_button' onClick={()=> setShow(false) }>No</Button>
          </div>
        </>
            }
          </div>
        </section>
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

export default Settings