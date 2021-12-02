import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import MyNavbar from './components/MyNavbar'


function App() {
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get('/api/books') // * <-- replace with your endpoint
  //     console.log(res.data)
  //   }
  //   getData()
  // })

  return (
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        <Route path='/' component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
