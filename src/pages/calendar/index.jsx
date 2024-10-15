import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '@/components/pagelayout';
import CustomCalendar from '@/components/calendar';

import styles from './page.module.css';

const mockData = [
  {
    major: '소프트웨어학과',
  },
  {
    major: '컴퓨터학과',
  },
  {
    major: '정보통신학과',
  },
  {
    major: '정보보안학과',
  },
  {
    major: '데이터사이언스학과',
  },
  {
    major: '의예과',
  },
  {
    major: '글로벌경제학과',
  },
];

function Home() {
  const { handleSubmit, register, getValues } = useForm();
  const [selectedMajor, setSelectedMajor] = useState('소프트웨어학과');
  const [searchText, setSearchText] = useState('');

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = () => {
    setSelectedMajor(searchText);
  };

  return (
    <>
      <PageLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.sliderWrapper}>
            <span className={styles.sliderTitle}>{selectedMajor} 학사일정</span>
          </div>
          <CustomCalendar usage='home' />
          <div className={styles.searchWrapper}>
            <span className={styles.searchTitle}>학과 검색</span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.searchForm}
            >
              <input
                onChange={onChange}
                className={styles.searchInput}
                type='text'
                placeholder='학과명을 입력해주세요'
                {...register('major', { onChange })}
              />
            </form>
            <div className={styles.majorListWrapper}>
              <span className={styles.majorListTitle}>학과 목록</span>
              <div className={styles.majorList}>
                {mockData.map((data, i) => (
                  <div
                    key={data.i}
                    className={styles.majorItem}
                    onClick={() => setSelectedMajor(data.major)}
                  >
                    <span className={styles.majorName}>{data.major}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default Home;
