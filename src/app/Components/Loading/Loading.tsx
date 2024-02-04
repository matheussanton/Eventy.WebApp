'use client'

import styles from './styles.module.css'


const Loading = () => {
  return (
    <div className={styles.loaderWraper}>
        <div className={styles.loader}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
        </div>
    </div>
  );
};

export default Loading;
