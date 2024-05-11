import React from 'react';

import styles from './ImageGallery.module.css';

const ImageGallery = props => {
  const childrens = props.children;
  return (
    <div>
      <ul className={styles.ImageGallery}>{childrens}</ul>
    </div>
  );
};

export default ImageGallery;
