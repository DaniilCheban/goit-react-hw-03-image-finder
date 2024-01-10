import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchGalleryItems } from './API';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = () => {
    if (searchQuery === '') {
      setLoading(false);
      return;
    }

    const { pages, per_page } = page;

    fetchGalleryItems(searchQuery, pages, per_page)
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
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setPage(prevPage => prevPage + 1);
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
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    fetchImages();
  };

  const handleLoadMore = () => {
    fetchImages();
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery
        images={images}
        onImageClick={handleImageClick}
        loading={loading}
      />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export { App };
