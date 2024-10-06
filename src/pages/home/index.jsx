import Footer from '@/components/footer';
import { postLogin } from '@/api/authAPI';
import { useEffect } from 'react';

function Home() {
  // useEffect(() => {
  //   const login = async () => {
  //     try {
  //       await postLogin('abcd1234@naver.com', 'abcd1234');
  //       console.log('login success');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   login();
  // }, []); 로그인 테스트 코드

  return (
    <>
      <div>
        <h1>Skkuduler</h1>
      </div>
      <Footer />
    </>
  );
}

export default Home;
