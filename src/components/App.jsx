import * as API from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const addImages = async () => {
      if (!searchQuery) {
        return;
      }
      try {
        setIsLoading(true);

        const data = await API.fetchData(searchQuery, page);

        if (data.hits.length === 0) {
          toast.info('Sorry image not found');
          return;
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
        setError(null);
      } catch (error) {
        console.log(error);
        setError('Something went wrong!');
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    addImages();
  }, [searchQuery, page]);

  const handleFormSubmit = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== page && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </Container>
  );
};
