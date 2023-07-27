import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedComponent from './components/ProtectedComponent'
import VideoDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
    activeTab: 'HOME',
  }

  onChangeTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  addToSaveVideos = videoDetails => {
    const {savedVideos} = this.state
    const videoObject = savedVideos.find(each => each.id === videoDetails.id)

    if (videoObject) {
      this.setState(prev => ({
        savedVideos: [...prev.savedVideos],
      }))
    } else {
      this.setState({savedVideos: [...savedVideos, videoDetails]})
    }
  }

  removeSaveVideos = id => {
    const {savedVideos} = this.state
    const updatedVideos = savedVideos.filter(each => each.id !== id)
    this.setState({savedVideos: updatedVideos})
  }

  activeTabItem = item => {
    this.setState({activeTab: item})
  }

  render() {
    const {isDarkTheme, savedVideos, activeTab} = this.state
    console.log(isDarkTheme)

    return (
      <CartContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          addToSaveVideos: this.addToSaveVideos,
          activeTabItem: this.activeTabItem,
          activeTab,
          onChangeTheme: this.onChangeTheme,
          removeSaveVideos: this.removeSaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedComponent exact path="/" component={Home} />
          <ProtectedComponent exact path="/trending" component={Trending} />
          <ProtectedComponent exact path="/gaming" component={Gaming} />
          <ProtectedComponent
            exact
            path="/saved-videos"
            component={SavedVideos}
          />
          <ProtectedComponent
            exact
            path="/videos/:id"
            component={VideoDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
