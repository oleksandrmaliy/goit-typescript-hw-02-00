import { useState, useEffect } from 'react';

import styles from './App.module.css';

import getSearchPics from '../src/components/API/RequestSearch';
import Searchbar from '../src/components/Searchbar/Searchbar';
import ImageGallery from '../src/components/ImageGallery/ImageGallery';
import ImageGalleryItem from '../src/components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../src/components/Loader/Loader';
import Button from '../src/components/Button/Button';
import Modal from '../src/components/Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [imageData, setImageData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [button, setButton] = useState(false);

  const handleSearch = (search: string) => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = ({ largeImageURL }) => {
    setModalOpen(true);
    setImageData(largeImageURL);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImageData(null);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data } = await getSearchPics(search, page);
        setImages(data.hits?.length ? [...images, ...data.hits] : images);
        setButton(data.hits?.length === 12 ? true : false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchImages();
    }
  }, [search, page]);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && <Loader />}
      {!loading & !images.length ? (
        <p style={{ color: 'red', textAlign: 'center' }}>No photo to show</p>
      ) : (
        <ImageGallery>
          <ImageGalleryItem imageGalleryItems={images} sModal={showModal} />
        </ImageGallery>
      )}
      {button && (
        <Button onClick={loadMore} type="button">
          Load more
        </Button>
      )}
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={imageData} alt="Big view" />
        </Modal>
      )}
    </div>
  );
};

export default App;
