import { useState, udeEffect} from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import css from './imageGallery.module.css';

const ImageGallery = ({ searchQuery, page, onImagesData }) => {

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  componentDidUpdate(prevProps) {
    
    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.fetchImages(searchQuery, page);
    }
  }

  const fetchImages = (searchQuery, page) => {
    setStatus('pending');

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=36119540-6b0ed103a080a17c105931ea0&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching images.');
      })
      .then(imagesData => {
        const { hits, totalHits } = imagesData;

        if (page === 1) {
          setImages(hits);
          setStatus('resolved')
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
          }));
        }

        onImagesData(hits, totalHits);
      })
      .catch(error => {
        console.error(error);
        setStatus('rejected');
      });
  };

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
  }

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onImagesData: PropTypes.func.isRequired,
};

export default ImageGallery;
