import Footer from '@/components/footer';
import Header from '@/components/header';
import { postLogin, postRegister } from '@/api/authAPI';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    const login = async () => {
      try {
        await postLogin('joeplay0801@naver.com', 'abcd1234!');
        console.log('login success');
      } catch (error) {
        console.error(error);
      }
    };
    login();
  }, []); //로그인 테스트 코드

  return (
    <>
      <Header />
      <div></div>
      <Footer />
    </>
  );
}

export default Home;
