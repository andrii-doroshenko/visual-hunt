import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CSS from './ImageGallery.module.css';
import { ColorRing } from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { getPixabayQuery } from '../../services/getPixabay';
import { ErrorMessage } from '../ErrorCard/ErrorCard';
import { Button } from 'components/Button/Button';

const ImageGallery = ({ queryValue }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const prevQueryValueRef = useRef(queryValue);

  useEffect(() => {
    //check if the query value has changed
    if (prevQueryValueRef.current !== queryValue) {
      setPage(1);
      prevQueryValueRef.current = queryValue;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await getPixabayQuery(queryValue, page);

        if (!response.ok) {
          throw new Error();
        }

        const imageData = await response.json();

        if (imageData.hits.length === 0) {
          setError(true);
        } else {
          setImages(prevImages =>
            page === 1 ? imageData.hits : [...prevImages, ...imageData.hits]
          );
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [queryValue, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {error ? <ErrorMessage /> : null}

      <ul className={CSS.gallery}>
        {images ? <ImageGalleryItem items={images} /> : null}
      </ul>

      {isLoading ? <ColorRing wrapperClass={CSS.blocksWrapper} /> : null}

      {images.length > 0 ? (
        <Button className={CSS.loadMore} onClick={loadMoreImages}>
          Load More
        </Button>
      ) : null}
    </>
  );
};

ImageGallery.propTypes = {
  queryValue: PropTypes.string.isRequired,
};

export default ImageGallery;
