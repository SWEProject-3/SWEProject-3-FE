export const handleKakaoShare = (title, description, image, link) => {
  if (window.Kakao) {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: image,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: link,
            mobileWebUrl: link,
          },
        },
      ],
    });
  }
};
