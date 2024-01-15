import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map((image, index) => (
        <ImageGalleryItem key={index} image={image} onClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
