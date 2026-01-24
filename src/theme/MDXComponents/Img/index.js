import React from 'react';
import Img from '@theme-original/MDXComponents/Img';
import styles from './styles.module.css';

export default function ImgWrapper(props) {
  const { title, ...imgProps } = props;

  return (
    <figure className={styles.figure}>
      <div className={styles.imageWrapper}>
        <Img {...imgProps} />
      </div>
      {title && <figcaption className={styles.caption}>{title}</figcaption>}
    </figure>
  );
}
