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
import heartIcon from '@/assets/feeddetail/heart.svg';
import redheartIcon from '@/assets/feeddetail/redheart.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getEventDetail } from '@/api/calendar';
import {
  deleteComment,
  getComments,
  postComment,
  putComment,
} from '@/api/commentAPI';
import { deleteLike, postLike } from '@/api/likeAPI';

const defaultImage =
  'data:image/png;base64,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';

const ShareModal = ({ onClick, title, description, image }) => {
  const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const location = useLocation();

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
      .catch(() => alert('링크 복사 실패'));
    onClick();
  };

  return (
    <div className={styles.shareModal}>
      <div className={styles.modalbar} />
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
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken === null) {
      navigate('/signin');
      localStorage.setItem('redirectUrl', location.pathname);
    }
  }, [accessToken, location.pathname]);

  const [isLike, setIsLike] = useState(false);
  const [eventDetailData, setEventDetailData] = useState();
  const [eventCommentData, setEventCommentData] = useState();
  const [commentContent, setCommentContent] = useState('');
  const [commentId, setCommentId] = useState();
  const [commentEdit, setCommentEdit] = useState('');
  const [images, setImages] = useState();
  const [image, setImage] = useState(
    'data:image/png;base64,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'
  );
  const [isShareBtnClicked, setIsShareBtnClicked] = useState(false);
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const getEventDetailData = async () => {
    const response = await getEventDetail(id);
    setEventDetailData(response.data.data);
    setImages(response.data.data.images);
    setImage(response.data.data.imageUrl);
    setIsLike(response.data.data.isLiked);
  };
  const getCommentData = async () => {
    const response = await getComments(id, 0);
    setEventCommentData(response.data.data);
  };

  useEffect(() => {
    getEventDetailData();
    getCommentData();
  }, [id]);

  const handleOnclickRight = () => {
    const currentOrder = images.findIndex((img) => img.imageFile === image);
    if (currentOrder === images.length - 1) {
      setImage(images[0].imageUrl);
    } else {
      setImage(images[currentOrder + 1].imageUrl);
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

  const handlePostComment = async () => {
    try {
      if (commentContent === '') {
        alert('댓글을 입력해주세요');
        return;
      }
      await postComment(id, commentContent);
      setCommentContent('');
      getCommentData();
    } catch (error) {
      alert('댓글 등록 실패');
    }
  };

  const handleKebaClick = (commentId) => {
    setIsKebabClicked(!isKebabClicked);
    setCommentId(commentId);
  };

  const deleteCommentClick = async (commentId) => {
    try {
      await deleteComment(commentId);
      getCommentData();
    } catch (error) {
      alert('댓글 삭제 실패');
    }
  };

  const putCommentClick = async (commentId) => {
    try {
      if (commentEdit === '') {
        alert('댓글을 입력해주세요');
        return;
      }
      await putComment(commentId, commentEdit);
      setIsEditMode(false);
      getCommentData();
    } catch (error) {
      alert('댓글 수정 실패');
    }
  };

  const handleClickLike = async () => {
    setIsLike(!isLike);
    if (isLike) {
      try {
        await deleteLike(id);
      } catch (error) {
        alert('좋아요 삭제 실패');
      }
    } else {
      try {
        await postLike(id);
      } catch (error) {
        alert('좋아요 등록 실패');
      }
    }
  };

  return (
    <PageLayout>
      <div className={styles.pageWrapper}>
        <div className={styles.carouselWrapper}>
          <img
            src={
              image !== 'https://storage.googleapis.com/skkuduler/null'
                ? image
                : defaultImage
            }
            alt='carousel'
            className={styles.carouselImg}
          />
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
            <span className={styles.eventTitle}>
              {eventDetailData?.eventInfo.title}
            </span>
            <div className={styles.btnWrapper}>
              <img
                src={isLike ? redheartIcon : heartIcon}
                alt='heart'
                className={styles.heartIcon}
                onClick={() => handleClickLike()}
              />
              <button className={styles.shareButton}>
                <img
                  src={shareIcon}
                  alt='share'
                  className={styles.shareIcon}
                  onClick={handleShareBtnClick}
                />
              </button>
            </div>
          </div>
          <div className={styles.content}>
            <span className={styles.contentTitle}>기간:</span>
            <span className={styles.periodtxt}>
              {eventDetailData?.eventInfo.startDateTime} ~{' '}
              {eventDetailData?.eventInfo.endDateTime}
            </span>
          </div>
          <div className={styles.content}>
            <span className={styles.contentTitle}>학과/개인</span>
            <span className={styles.txt}>
              {eventDetailData?.departmentName}
            </span>
          </div>
          <div className={styles.content}>
            <span className={styles.contentTitle}>설명</span>
            <span className={styles.txt}>
              {eventDetailData?.eventInfo.content}
            </span>
          </div>
        </div>
        <div className={styles.commentWrapper}>
          <div className={styles.commentTitle}>
            <span>댓글</span>
            <span className={styles.commentCnt}>
              {eventCommentData?.page.totalElements}
            </span>
          </div>
          {eventCommentData &&
            eventCommentData?.content.map((comment) => (
              <div className={styles.commentContent} key={comment.commentId}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentUser}>
                    <span className={styles.commentName}>
                      {comment.userName}
                    </span>
                    <span className={styles.commentDate}>
                      {comment.createdAt}
                    </span>
                  </div>
                  <img
                    src={kebabIcon}
                    alt='kebab'
                    className={styles.kebabIcon}
                    style={{
                      display: comment.isMyComment ? 'block' : 'none',
                    }}
                    onClick={() => handleKebaClick(comment.commentId)}
                  />
                  {isKebabClicked && comment.commentId === commentId && (
                    <div className={styles.editmodal}>
                      <div
                        className={styles.modalcontent}
                        onClick={() => {
                          setIsEditMode(true);
                          setIsKebabClicked(false);
                        }}
                      >
                        수정
                      </div>
                      <div className={styles.bar} />
                      <div
                        className={styles.modalcontent}
                        onClick={() => deleteCommentClick(comment.commentId)}
                      >
                        삭제
                      </div>
                    </div>
                  )}
                </div>
                <span className={styles.comment}>
                  {isEditMode && comment.commentId === commentId ? (
                    <input
                      type='text'
                      className={styles.editInput}
                      onChange={(e) => setCommentEdit(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && putCommentClick(comment.commentId)
                      }
                    />
                  ) : (
                    comment.content
                  )}
                </span>
              </div>
            ))}

          <input
            type='text'
            className={styles.commentInput}
            placeholder='댓글을 입력해주세요'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
          />
        </div>
      </div>
      {isShareBtnClicked && (
        <ShareModal
          onClick={() => setIsShareBtnClicked(!isShareBtnClicked)}
          title={eventDetailData?.eventInfo.title}
          description={eventDetailData?.eventInfo.content}
          image={image}
        />
      )}
    </PageLayout>
  );
}

export default Home;
