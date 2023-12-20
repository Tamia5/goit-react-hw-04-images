import React, { Component } from 'react';
import * as API from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    loadMore: false,
    totalPages: 0,
  };
  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.addImages();
    }
  }

  addImages = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const data = await API.fetchData(searchQuery, page);

      if (data.hits.length === 0) {
        toast.info('Sorry image not found');
        return;
      }

      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
      throw error;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, page, totalPages } = this.state;
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}

        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== page && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </Container>
    );
  }
}
