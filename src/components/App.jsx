import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchGalleryItems } from './API';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      page: 1,
      loading: false,
      selectedImage: null,
    };
  }

  fetchImages = () => {
    if (this.state.searchQuery === '') {
      this.setState({ loading: false });
      return;
    }

    const { page } = this.state;
    const { searchQuery } = this.state;

    fetchGalleryItems(searchQuery, page)
      .then(response => {
        if (!response.data.hits.length) {
          Swal.fire({
            title: 'Hmm...',
            text: "If you don't know what you want, I'm not sure what to show you!",
            icon: 'question',
            backdrop: true,
            confirmButtonText: 'Try again?',
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            page: prevState.page + 1,
          }));
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Not cool (((',
        });
        console.error(error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchSubmit = query => {
    this.setState({
      images: [],
      page: 1,
      searchQuery: query,
    });
    this.fetchImages();
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
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
          <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export { App };
