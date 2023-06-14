import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPixabayQuery } from '../services/getPixabay';
import { ErrorMessage } from './ErrorCard/ErrorCard';
import { ColorRing } from 'react-loader-spinner';
import CSS from './App.module.css';

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
        setIsButtonShown(false);
        setIsLoading(true);
        setError(false);

        const response = await getPixabayQuery(queryValue, page);
        const imageData = await response.json();

        if (imageData.hits.length === 0) {
          setError(true);
          setIsButtonShown(true);
          return;
        }
        setImages(prevImages => [...prevImages, ...imageData.hits]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (!queryValue.trim()) return;

    fetchImages();
  }, [queryValue, page]);

  const handleSearch = valueSearch => {
    setQueryValue(valueSearch);
  };

  const handleLoadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleResetPage = () => setPage(1);

  return (
    <>
      <Searchbar handleSearch={handleSearch} onResetPage={handleResetPage} />
      {error ? <ErrorMessage /> : null}
      {images.length !== 0 ? (
        <ImageGallery
          images={images}
          onLoadMore={handleLoadMoreImages}
          isButtonShown={isButtonShown}
        />
      ) : null}
      {isLoading ? <ColorRing wrapperClass={CSS.blocksWrapper} /> : null}
    </>
  );
};

export default App;
