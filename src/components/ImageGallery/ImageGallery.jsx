import PropTypes from 'prop-types';
import CSS from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={CSS.gallery}>
        {images && <ImageGalleryItem items={images} />}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
