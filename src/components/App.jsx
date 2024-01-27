import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchGalleryItems } from './API';

class App extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    selectedImage: null,
  };

  handleSearchSubmit = query => {
    if (query.trim() === '') {
      return;
    }

    this.setState({
      images: [],
      page: 1,
      searchQuery: query,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    if (this.state.searchQuery === '') {
      this.setState({ loading: false });
      return;
    }

    const { page, searchQuery } = this.state;

    fetchGalleryItems(searchQuery, page)
      .then(response => {
        const { hits, totalHits } = response.data;

        this.setState(prev => ({
          images: [...prev.images, ...hits],
          loadMore: page < Math.ceil(totalHits / 12),
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  handleModalClick = e => {
    if (e.target === e.currentTarget) {
      this.handleCloseModal();
    }
  };

  render() {
    const { images, loading, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          images={images}
          onImageClick={this.handleImageClick}
          loading={loading}
        />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {selectedImage && (
          <Modal
            imageUrl={selectedImage}
            onClose={this.handleCloseModal}
            onClick={this.handleModalClick}
          />
        )}
      </div>
    );
  }
}

export { App };
