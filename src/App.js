import React, { Component } from 'react';
import './App.css';
import ListView from './views/ListView'
import {
  getAPIKey,
  getSecretKey,
} from './Secrets';

class App extends Component {

  state = {
    photos: [],
  }

  getListPhotos = async () => {
    const IMG_PER_PAGE = 100;
    const API_KEY = getAPIKey();
    const SECRET_KEY = getSecretKey();
    const api_call = await fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY}&per_page=${IMG_PER_PAGE}`);
    const data = await api_call.json();
    this.setState({ photos: data });
    console.log(this.state.photos);
    const photos = this.state.photos;
    console.log(photos[0].urls.full)
  }

  componentDidMount() {
    this.getListPhotos();
  }

  render() {
    return (
      <div className="App">
        <ListView photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
