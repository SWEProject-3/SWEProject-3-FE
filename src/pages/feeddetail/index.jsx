import { useState } from 'react';
import styles from './page.module.css';
import PageLayout from '@/components/pagelayout';
import leftArrowIcon from '@/assets/feeddetail/leftarrow.svg';
import rightArrowIcon from '@/assets/feeddetail/rightarrow.svg';

const images = [
  {
    imageFile:
      'https://flexible.img.hani.co.kr/flexible/normal/970/646/imgdb/original/2020/0815/20200815500302.jpg',
    order: 0,
  },
  {
    imageFile:
      'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg',
    order: 1,
  },
  {
    imageFile:
      'https://flexible.img.hani.co.kr/flexible/normal/970/646/imgdb/original/2020/0815/20200815500302.jpg',
    order: 2,
  },
  {
    imageFile:
      'https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg',
    order: 3,
  },
];

function Home() {
  const [image, setImage] = useState(images[0].imageFile);
  const handleOnclickRight = () => {
    const currentOrder = images.findIndex((img) => img.imageFile === image);
    if (currentOrder === images.length - 1) {
      setImage(images[0].imageFile);
    } else {
      setImage(images[currentOrder + 1].imageFile);
    }
  };
  const handleOnclickLeft = () => {
    const currentOrder = images.findIndex((img) => img.imageFile === image);
    if (currentOrder === 0) {
      setImage(images[images.length - 1].imageFile);
    } else {
      setImage(images[currentOrder - 1].imageFile);
    }
  };
  return (
    <PageLayout>
      <div className={styles.pageWrapper}>
        <div className={styles.carouselWrapper}>
          <img src={image} alt='carousel' className={styles.carouselImg} />
          <img
            src={leftArrowIcon}
            alt='left'
            className={styles.leftArrow}
            onClick={handleOnclickLeft}
          />
          <img
            src={rightArrowIcon}
            alt='right'
            className={styles.rightArrow}
            onClick={handleOnclickRight}
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default Home;
