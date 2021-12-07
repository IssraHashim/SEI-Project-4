import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthorPage from './components/AuthorPage'
import Book from './components/Book'
import Browse from './components/Browse'
import BrowseByGenre from './components/BrowseByGenre'
import Collection from './components/Collection'
import Home from './components/Home'
import MyNavbar from './components/MyNavbar'
import Register from './components/Register'


function App() {


  return (
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/browse' component={Browse}/>
        <Route exact path='/collection' component={Collection}/>
        <Route exact path='/browse/:genre' component={BrowseByGenre}/>
        <Route exact path='/books/:id' component={Book}/>
        <Route exact path='/author/:id' component={AuthorPage}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
