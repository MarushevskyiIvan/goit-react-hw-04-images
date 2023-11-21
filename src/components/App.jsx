import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { fetchImages } from './fetchAPI/FetchAPI';
import { SearchBar } from './searchBar/SearchBar';
import { ImageGallery } from './gallery/imageGallery/ImageGallery';
import { LoadMoreButton } from './loadMoreButton/LoadMoreButton';
import { Loader } from './loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [randomId, setRandomId] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchApi() {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);

        const newImages = await fetchImages(query, page, {
          signal: abortController.signal,
        });

        setImages(prevState => [...prevState, ...newImages.hits]);
        setIsLoadMore(page < Math.ceil(newImages.totalHits / 12));
      } catch (error) {
        toast.error('Attention  ERROR fetch images Please reload pages ');
      } finally {
        setIsLoading(false);
      }
    }
    fetchApi();
    return () => {
      abortController.abort();
    };
  }, [query, page, randomId]);

  const handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      return toast.error('Please enter the text of the query');
    }

    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setRandomId(Math.random());
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);

    scroll.scrollToBottom();
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}

      {images.length > 0 && <ImageGallery item={images} />}

      {images.length > 0 && isLoadMore && (
        <LoadMoreButton addImages={handleLoadMore} />
      )}
      <Toaster />
      <GlobalStyle />
    </>
  );
};
