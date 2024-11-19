import { useEffect, useState } from 'react';
import styles from './page.module.css';
import PageLayout from '@/components/pagelayout';
import leftArrowIcon from '@/assets/feeddetail/leftarrow.svg';
import rightArrowIcon from '@/assets/feeddetail/rightarrow.svg';
import shareIcon from '@/assets/feeddetail/share.svg';
import kakaoIcon from '@/assets/feeddetail/kakao.svg';
import linkIcon from '@/assets/feeddetail/link.svg';
import { handleKakaoShare } from '@/utils/kakaoshare';
import kebabIcon from '@/assets/feeddetail/kebab.svg';

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

const ShareModal = ({ onClick, title, description, image }) => {
  const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const url = window.location.href;
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(API_KEY);
    }
  }, []);

  const handleKakaoClick = () => {
    handleKakaoShare(title, description, image, url);
    onClick();
  };
  const handlecopyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => alert('링크가 복사되었습니다!'))
      .catch(() => alert('링크 복사 실패:'));
    onClick();
  };

  return (
    <div className={styles.shareModal}>
      <div className={styles.bar}></div>
      <div className={styles.shareWrapper} onClick={handleKakaoClick}>
        <img src={kakaoIcon} alt='share' className={styles.kakaoIcon} />
        <span className={styles.shareText}>카카오톡으로 공유하기</span>
      </div>
      <div className={styles.shareWrapper} onClick={handlecopyLink}>
        <div className={styles.linkIconWrapper}>
          <img src={linkIcon} alt='share' className={styles.linkIcon} />
        </div>
        <span className={styles.shareText}>링크 복사하기</span>
      </div>
    </div>
  );
};

function Home() {
  const [image, setImage] = useState(images[0].imageFile);
  const [isShareBtnClicked, setIsShareBtnClicked] = useState(false);
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
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
  const handleShareBtnClick = () => {
    setIsShareBtnClicked(!isShareBtnClicked);
  };

  return (
    <PageLayout>
      <div className={styles.pageWrapper}>
        <div className={styles.carouselWrapper}>
          <img src={image} alt='carousel' className={styles.carouselImg} />
          <img
            src={leftArrowIcon}
            alt='leftarrow'
            className={styles.leftArrow}
            onClick={handleOnclickLeft}
          />
          <img
            src={rightArrowIcon}
            alt='rightarrow'
            className={styles.rightArrow}
            onClick={handleOnclickRight}
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>
            <span className={styles.eventTitle}>행사 1</span>
            <button className={styles.shareButton}>
              <img
                src={shareIcon}
                alt='share'
                className={styles.shareIcon}
                onClick={handleShareBtnClick}
              />
            </button>
          </div>
          <div className={styles.content}>
            <span className={styles.contentTitle}>기간:</span>
            <span className={styles.periodtxt}>2024.07.01 ~ 2024.07.30</span>
          </div>
          <div className={styles.content}>
            <span className={styles.contentTitle}>학과/개인</span>
            <span className={styles.txt}>소프트웨어학과</span>
          </div>
          <div className={styles.content}>
            <span className={styles.contentTitle}>설명</span>
            <span className={styles.txt}>
              이 행사에 대해서 설명 드리면
              <br />
              이 행사는 2024년 11/01 ~ 11/30일까지 진행됩니다.
              <br />
              서울에서 진행됩니다.
            </span>
          </div>
        </div>
        <div className={styles.commentWrapper}>
          <div className={styles.commentTitle}>
            <span>댓글</span>
            <span className={styles.commentCnt}>3</span>
          </div>
          <div className={styles.commentContent}>
            <div className={styles.commentHeader}>
              <div className={styles.commentUser}>
                <span className={styles.commentName}>홍길동</span>
                <span className={styles.commentDate}>2024.07.01</span>
              </div>
              <img
                src={kebabIcon}
                alt='kebab'
                className={styles.kebabIcon}
                onClick={() => setIsKebabClicked(!isKebabClicked)}
              />
              {isKebabClicked && (
                <div className={styles.editmodal}>
                  <div
                    className={styles.modalcontent}
                    onClick={() => setIsEditMode(true)}
                  >
                    수정
                  </div>
                  <div className={styles.bar} />
                  <div className={styles.modalcontent}>삭제</div>
                </div>
              )}
            </div>
            <span className={styles.comment}>
              광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식
              광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식
            </span>
          </div>
          <div className={styles.commentContent}>
            <div className={styles.commentHeader}>
              <div className={styles.commentUser}>
                <span className={styles.commentName}>홍길동</span>
                <span className={styles.commentDate}>2024.07.01</span>
              </div>
              <img src={kebabIcon} alt='kebab' className={styles.kebabIcon} />
            </div>
            <span className={styles.comment}>
              광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식
              광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식광식
            </span>
          </div>
        </div>
      </div>
      {isShareBtnClicked && (
        <ShareModal
          onClick={() => setIsShareBtnClicked(!isShareBtnClicked)}
          title='행사1'
          description='너무힘듬'
          image={images[0].imageFile}
        />
      )}
    </PageLayout>
  );
}

export default Home;
