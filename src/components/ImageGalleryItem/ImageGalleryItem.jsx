import { useState } from 'react';
import PropTypes from 'prop-types';
import CSS from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const onHandleKeyDown = () => {
    setSelectedImage(null);
  };

  const cards = () =>
    items.map(({ id, webformatURL, tags, largeImageURL }) => {
      return (
        <li key={id} className={CSS.galleryItem}>
          <img
            className={CSS.image}
            src={webformatURL}
            alt={tags}
            onClick={() => handleImageClick({ largeImageURL, tags })}
          />
        </li>
      );
    });

  return (
    <>
      {cards()}
      {selectedImage && (
        <Modal
          onClose={onHandleKeyDown}
          image={selectedImage.largeImageURL}
          tags={selectedImage.tags}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
