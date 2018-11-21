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
    page: 1,
    scrolling: false,
  }

  getListPhotos = () => {
    const API_KEY = getAPIKey();
    const SECRET_KEY = getSecretKey();
    const page = this.state.page;
    const per_page = 10;
    const url = `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}&per_page=${per_page}`;

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => {
          return {
            photos: prevState.photos.concat(data),
            scrolling: false,
          }
        }));

    console.log(this.state.photos);
  }

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        scrolling: true,
      }
    }, this.getListPhotos)
  }

  handleScroll = (e) => {
    const page = this.state.page;
    const scrolling = this.state.scrolling;
    const lastLi = document.querySelector('div.photo span:last-child')
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;

    if (scrolling) return;
    if (pageOffset > lastLiOffset - bottomOffset) this.loadMore()
  }

  componentDidMount() {
    this.getListPhotos();
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e);
    })

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
