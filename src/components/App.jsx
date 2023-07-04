import React, { useState, useCallback } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [images, setImages] = useState([]);

  const handleSearchSubmit = useCallback(searchQuery => {
    setPage(1);
    setImages([]);
    setSearchQuery(searchQuery);
  }, []);

  const handleImagesData = useCallback((hits, totalHits) => {
    setImages(prevImages => [...prevImages, ...hits]);
    setTotalHits(totalHits);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const moreContent = images.length < totalHits && images.length > 0;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery
        searchQuery={searchQuery}
        page={page}
        onImagesData={handleImagesData}
      />
      {moreContent && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};

export default App;
