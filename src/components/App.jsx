import React from 'react';
import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    totalHits: 0,
    images: [],
  };

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  handleImagesData = (hits, totalHits) => {
    this.setState(prevState => ({
      images: [...prevState.images, ...hits],
      totalHits,
    }));
  };

  handleLoadMore = () => {
    const { searchQuery, page } = this.state;
    this.setState({ page: page + 1 });
    this.fetchImages(searchQuery, page + 1);
  };

  fetchImages = (searchQuery, page) => {
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=36119540-6b0ed103a080a17c105931ea0&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(imagesData => {
        const { hits, totalHits } = imagesData;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
        }));
      });
  };

  render() {
    const { searchQuery, page, totalHits, images } = this.state;
    const moreContent = images.length < totalHits && images.length > 0;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          onImagesData={this.handleImagesData}
        />
        {moreContent && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
