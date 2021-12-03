import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Book from './components/Book'
import Browse from './components/Browse'
import BrowseByGenre from './components/BrowseByGenre'
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
        <Route exact path='/' component={Home}/>
        <Route exact path='/browse' component={Browse}/>
        <Route exact path='/browse/:genre' component={BrowseByGenre}/>
        <Route exact path='/:id' component={Book}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
