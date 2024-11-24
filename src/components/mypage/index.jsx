import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './mypage.module.css';
import exampleProfile from '@/assets/mypage/exampleprofile.svg';
import { getProfile } from '@/api/userAPI';

function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        setError('로그인이 필요합니다');
        return;
      }
      try {
        setLoading(true);
        const response = await getProfile(userId);
        setProfileData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error)
    return <div className={styles.error}>에러 발생: {error.message}</div>;
  if (!profileData)
    return (
      <div className={styles.error}>사용자 정보를 불러올 수 없습니다.</div>
    );

  const handleEditProfile = () => {
    navigate('/edit-profile', {
      state: {
        name: profileData.name,
        email: profileData.email,
      },
    });
  };

  // example schedules
  const schedules = [
    { id: 1, time: '하루종일', title: '운영체제 중간고사' },
    { id: 2, time: '하루종일', title: '학생회 행사' },
    { id: 3, time: '14:00', title: '아르바이트' },
    { id: 4, time: '18:00', title: '배드민턴' },
    { id: 5, time: '24:00', title: '소공개 과제 제출 마감' },
  ];

  // example department
  const departments = [
    { id: 1, name: '소프트웨어학과' },
    { id: 2, name: '수학과' },
    { id: 3, name: '화학공학과' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>내 프로필</h2>
        <div className={styles.profileContent}>
          <img
            className={styles.profileImage}
            src={exampleProfile}
            alt='Profile'
          />
          <div className={styles.profileInfo}>
            <h3 className={styles.userName}>{profileData.name}</h3>
            <p className={styles.userEmail}>{profileData.email}</p>
          </div>
        </div>

        <button className={styles.editButton} onClick={handleEditProfile}>
          프로필 수정
        </button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>오늘의 일정</h2>
        <ul className={styles.scheduleList}>
          {schedules.map((schedule) => (
            <li className={styles.scheduleItem} key={schedule.id}>
              <span className={styles.scheduleTime}>{schedule.time}</span>
              <span className={styles.scheduleTitle}>{schedule.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>구독한 학과 목록</h2>
        <ul className={styles.departmentList}>
          {departments.map((department) => (
            <li className={styles.departmentItem} key={department.id}>
              <span className={styles.scheduleTitle}>{department.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MyPage;
