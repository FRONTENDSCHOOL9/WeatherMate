import { useEffect } from 'react';
const { Kakao } = window;

function KakaoShareButton(data) {
  const url = 'http://localhost:5173/';
  const resultUrl = window.location.href;

  useEffect(() => {
    // if (!Kakao.isInitialized()) {
    //   Kakao.init('44ca17bb4cb74c64db42d774cc78f8af');
    // }
    console.log(Kakao.isInitialized());
    console.log(data);
  }, [data]);

  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '🌤️날씨 성격 테스트🌤️',
        description: ` ${data.data.title}`,
        imageUrl: url + data.data.image,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },

      buttons: [
        {
          title: '나도 테스트하러가기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
  console.log(data.data.image);
  return (
    <button
      onClick={shareKakao}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      카카오톡 공유하기
    </button>
  );
}

export default KakaoShareButton;
