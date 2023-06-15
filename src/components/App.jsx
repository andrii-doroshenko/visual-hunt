import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPixabayQuery } from '../services/getPixabay';
import { ErrorMessage } from './ErrorCard/ErrorCard';
import { ColorRing } from 'react-loader-spinner';
import { Button } from './Button/Button';
import CSS from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const [queryValue, setQueryValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!queryValue.trim()) return;

        const response = await getPixabayQuery(queryValue, page);
        const imageData = await response.json();

        const imageCount = imageData.hits.length;

        if (imageCount === 0) {
          Notify.warning('No results for this query');
        } else if (imageCount < 12) {
          Notify.warning('No more images were found');
        }

        setIsButtonShown(imageCount >= 12);

        setImages(prevImages => [...prevImages, ...imageData.hits]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [queryValue, page]);

  const handleSearch = valueSearch => {
    setError(false);
    setPage(1);
    setQueryValue(valueSearch);
    setImages([]);
  };

  const handleLoadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <ColorRing wrapperClass={CSS.blocksWrapper} />}
      {isButtonShown && (
        <Button className={CSS.loadMore} onClick={handleLoadMoreImages}>
          Load More
        </Button>
      )}
    </>
  );
};

export default App;
