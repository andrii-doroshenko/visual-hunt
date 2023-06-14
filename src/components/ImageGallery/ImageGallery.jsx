import PropTypes from 'prop-types';
import CSS from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

const ImageGallery = ({ images, onLoadMore, isButtonShown }) => {
  return (
    <>
      <ul className={CSS.gallery}>
        {images ? <ImageGalleryItem items={images} /> : null}
      </ul>

      {!isButtonShown ? (
        <Button className={CSS.loadMore} onClick={onLoadMore}>
          Load More
        </Button>
      ) : null}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
