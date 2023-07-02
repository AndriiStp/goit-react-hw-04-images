import React from 'react';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  resetImages = () => {
    this.setState({ images: [] });
  };

  render() {
    const { id, webformatURL, alt, largeImageURL } = this.props;
    const { showModal } = this.state;
    return (
      <li key={id} className={css.image__gallery__item}>
        <img
          className={css.image__gallery__item__image}
          src={webformatURL}
          alt={alt}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={alt}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
