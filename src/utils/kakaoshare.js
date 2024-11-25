export const handleKakaoShare = (title, description, image, url) => {
  console.log(url);
  if (window.Kakao) {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: image,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  }
};
