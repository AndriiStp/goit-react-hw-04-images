import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li key={id} className={css.image__gallery__item}>
      <img
        className={css.image__gallery__item__image}
        src={webformatURL}
        alt={alt}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal largeImageURL={largeImageURL} alt={alt} onClose={toggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
