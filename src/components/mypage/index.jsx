import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './mypage.module.css';
import exampleProfile from '@/assets/mypage/exampleprofile.svg';

function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // user data load
  const user = {
    name: '김성균',
    email: 'skku@example.com',
    profileImage: exampleProfile,
    password: '1234',
  };

  // example schedules
  const schedules = [
    { id: 1, time: '하루종일', title: '운영체제 중간고사' },
    { id: 2, time: '하루종일', title: '학생회 행사' },
    { id: 3, time: '14:00', title: '아르바이트' },
    { id: 4, time: '18:00', title: '배드민턴' },
    { id: 5, time: '24:00', title: '소공개 과제 제출 마감' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>내 프로필</h2>
        <div className={styles.profileContent}>
          <img
            className={styles.profileImage}
            src={user.profileImage}
            alt='Profile'
          />
          <div className={styles.profileInfo}>
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <button
          className={styles.editButton}
          onClick={() => navigate('/edit-profile', { state: { user } })}
        >
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
    </div>
  );
}
export default MyPage;
