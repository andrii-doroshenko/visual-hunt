import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [queryValue, setQueryValue] = useState('');

  const handleSearch = valueSearch => {
    setQueryValue(valueSearch);
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery queryValue={queryValue} />
    </>
  );
};

export default App;
