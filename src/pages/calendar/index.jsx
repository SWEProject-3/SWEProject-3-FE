import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '@/components/pagelayout';
import CustomCalendar from '@/components/calendar';
import {
  deleteDepartment,
  getDepartments,
  postDepartment,
} from '@/api/department';

import styles from './page.module.css';
import useYearMonthStore from '@/store/yearMonthStore';
import useInfoModalStore from '@/store/infoModalStore';
import Button from '@/components/button';

function Home() {
  const { handleSubmit, register, getValues } = useForm();
  const [selectedMajor, setSelectedMajor] = useState();
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [departmentId, setDepartmentId] = useState(null);
  const year = useYearMonthStore((state) => state.year);
  const month = useYearMonthStore((state) => state.month);
  const getDepartmentList = async () => {
    const res = await getDepartments();
    setDepartments(res.data.data.content);
    setSelectedMajor(res.data.data.content[0].departmentName);
    setDepartmentId(res.data.data.content[0].departmentId);
  };
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken) {
      getDepartmentList();
    }
  }, [accessToken]);

  useEffect(() => {
    const filteredDepartments = departments.filter((data) =>
      data.departmentName.includes(searchText)
    );
    setFilteredDepartments(filteredDepartments);
  }, [searchText, departments, departmentId]);

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

  const handleOnClickSubscribe = async (departmentId) => {
    try {
      await postDepartment(departmentId);
      getDepartmentList();
    } catch (error) {
      if (error.response.code === '404_001') {
        alert('로그인이 필요합니다.');
      } else if (error.response.code === '404_002') {
        alert('해당 학과가 존재하지 않습니다.');
      }
    }
  };
  const handleOnClickUnsubscribe = async (departmentId) => {
    try {
      await deleteDepartment(departmentId);
      getDepartmentList();
    } catch (error) {
      if (error.response.code === '404_001') {
        alert('로그인이 필요합니다.');
      } else if (error.response.code === '404_002') {
        alert('해당 학과가 존재하지 않습니다.');
      }
    }
  };

  return (
    <>
      <PageLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.sliderWrapper}>
            <span className={styles.sliderTitle}>{selectedMajor} 학사일정</span>
          </div>
          <CustomCalendar id={departmentId} usage='calendar' />
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
                    {data.subscribed ? (
                      <Button
                        color='red'
                        onClick={() =>
                          handleOnClickUnsubscribe(data.departmentId)
                        }
                      >
                        구독취소
                      </Button>
                    ) : (
                      <Button
                        color='blue'
                        onClick={() =>
                          handleOnClickSubscribe(data.departmentId)
                        }
                      >
                        구독
                      </Button>
                    )}
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
