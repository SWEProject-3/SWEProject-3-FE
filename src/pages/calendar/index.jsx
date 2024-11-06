import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '@/components/pagelayout';
import CustomCalendar from '@/components/calendar';
import { getDepartments } from '@/api/department';
import { getCalendar, getCalendarDetail } from '@/api/calendar';

import styles from './page.module.css';
import { postLogin, postRegister, putPassword } from '@/api/authAPI';
import useYearMonthStore from '@/store/yearMonthStore';
import useInfoModalStore from '@/store/infoModalStore';

function Home() {
  const { handleSubmit, register, getValues } = useForm();
  const [selectedMajor, setSelectedMajor] = useState();
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [departmentId, setDepartmentId] = useState(null);
  const [calendarId, setCalendarId] = useState(null);
  const year = useYearMonthStore((state) => state.year);
  const month = useYearMonthStore((state) => state.month);
  useEffect(() => {
    // const login = async () => {
    //   try {
    //     const res = await postLogin('joeplay0801@naver.com', 'abcd1234!');
    //     console.log(res.data);
    //     localStorage.setItem('token', res.data.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // login();

    const getDepartmentList = async () => {
      const res = await getDepartments();
      setDepartments(res.data.data.content);
      setSelectedMajor(res.data.data.content[0].departmentName);
      setDepartmentId(res.data.data.content[0].departmentId);
    };
    getDepartmentList();
  }, []);

  useEffect(() => {
    const filteredDepartments = departments.filter((data) =>
      data.departmentName.includes(searchText)
    );
    setFilteredDepartments(filteredDepartments);

    const getCalendarList = async () => {
      const res = await getCalendar(null, departmentId);
      setCalendarId(res.data.data[0]?.calenderId);
    };
    if (departmentId) {
      getCalendarList();
    }
  }, [searchText, departments, departmentId]);

  useEffect(() => {
    const fetchCalendarDetail = async (calendarId) => {
      const res = await getCalendarDetail(
        calendarId,
        null,
        null,
        null,
        `${year}-${month}`
      );
      console.log(res.data.data);
    };
    if (calendarId) {
      fetchCalendarDetail(calendarId); // fetchCalendarDetail로 호출
    }
  }, [calendarId]);

  const handleClickMajor = (departmentName, departmentId) => {
    setSelectedMajor(departmentName);
    setDepartmentId(departmentId);
  };

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = () => {
    console.log(searchText);
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
                {filteredDepartments.map((data) => (
                  <div
                    key={data.departmentId}
                    className={styles.majorItem}
                    onClick={() =>
                      handleClickMajor(data.departmentName, data.departmentId)
                    }
                  >
                    <span className={styles.majorName}>
                      {data.departmentName}
                    </span>
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
