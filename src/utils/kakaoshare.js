export const handleKakaoShare = (title, description, image, link) => {
  if (window.Kakao) {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: image,
        link: {
          mobileWebUrl: 'https://www.naver.com/',
          webUrl: 'https://www.naver.com/',
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: 'https://www.naver.com/',
            mobileWebUrl: 'https://www.naver.com/',
          },
        },
      ],
    });
  }
};
