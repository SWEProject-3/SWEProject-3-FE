import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './mypage.module.css';
import exampleProfile from '@/assets/mypage/exampleprofile.svg';
import { getProfile } from '@/api/userAPI';
import { getUserEvents } from '@/api/calendar';
import { getSubscribedDepartments } from '@/api/department';

function MyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        setError('로그인이 필요합니다');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        if (userId) {
          const [profileResponse, scheduleResponse, departmentsResponse] =
            await Promise.all([
              getProfile(userId),
              getUserEvents(
                userId,
                true,
                new Date().toISOString().split('T')[0],
                new Date().toISOString().split('T')[0],
                null
              ),
              getSubscribedDepartments(null, null, userId),
            ]);

          setProfileData(profileResponse.data.data);

          const formattedSchedules = scheduleResponse.data.data.map(
            (event) => ({
              id: event.eventId,
              time:
                event.startDateTime.substring(11, 16) === '00:00'
                  ? '하루종일'
                  : event.startDateTime.substring(11, 16),
              title: event.title,
              colorCode: event.colorCode,
            })
          );

          setSchedules(formattedSchedules);
          setDepartments(departmentsResponse.data.data.content);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>에러 발생: {error}</div>;
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
        {schedules.length === 0 ? (
          <div className={styles.emptyMessage}>오늘 일정이 없습니다.</div>
        ) : (
          <ul className={styles.scheduleList}>
            {schedules.map((schedule) => (
              <li className={styles.scheduleItem} key={schedule.id}>
                <span className={styles.scheduleTime}>{schedule.time}</span>
                <span className={styles.scheduleTitle}>{schedule.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>구독한 학과 목록</h2>
        {departments.length === 0 ? (
          <div className={styles.emptyMessage}>구독한 학과가 없습니다.</div>
        ) : (
          <ul className={styles.departmentList}>
            {departments.map((department) => (
              <li
                className={styles.departmentItem}
                key={department.departmentId}
              >
                <span className={styles.scheduleTitle}>{department.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPage;
