import React from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { imageGalleryItems, sModal } = props;
  const smallPicsSet = imageGalleryItems.map(({ id, webformatURL, largeImageURL }) => (
    <li key={id} onClick={() => sModal({ largeImageURL })} className={styles.ImageGalleryItem}>
      <img src={webformatURL} alt="Small view" className={styles.ImageGalleryItemImage} />
    </li>
  ));
  return <>{smallPicsSet}</>;
};

export default ImageGalleryItem;
