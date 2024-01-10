import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li
      className="ImageGalleryItem "
      onClick={() => onClick(image.largeImageURL)}
    >
      <img src={image.webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
