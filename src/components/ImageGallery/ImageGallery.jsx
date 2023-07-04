import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import css from './imageGallery.module.css';

const ImageGallery = ({ searchQuery, page, onImagesData }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchImages = async (searchQuery, page) => {
      setStatus('pending');

      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=36119540-6b0ed103a080a17c105931ea0&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (response.ok) {
          const imagesData = await response.json();
          const { hits, totalHits } = imagesData;

          if (page === 1) {
            setImages(hits);
            setStatus('resolved');
          } else {
            setImages(prevImages => [...prevImages, ...hits]);
            setStatus('resolved');
          }

          onImagesData(hits, totalHits);
        } else {
          throw new Error('Error fetching images.');
        }
      } catch (error) {
        console.error(error);
        setStatus('rejected');
      }
    };

    if (searchQuery !== '') {
      fetchImages(searchQuery, page);
    }
  }, [searchQuery, page, onImagesData]);

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h1>Error, please try again later!</h1>;
  }

  return (
    <ul className={css.image__gallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          alt={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onImagesData: PropTypes.func.isRequired,
};

export default ImageGallery;
