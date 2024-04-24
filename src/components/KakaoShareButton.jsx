import { useEffect } from 'react';
import kakaoLogo from '/kakaoLogo.svg';
const { Kakao } = window;

function KakaoShareButton(data) {
  const url = import.meta.env.VITE_APP_TITLE;
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
        imageUrl: `url + data.data.image`,
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
      className="flex gap-2 justify-center bg-kakao hover:bg-primary text-kakao-lable py-3 px-7 border border-gray-400 rounded-lg shadow xl:grow "
    >
      <img src={kakaoLogo} alt="kakao logo" className="w-[28px] xl:w-[32px] " />
      <p className="align-middle xl:text-xl">공유하기</p>
    </button>
  );
}

export default KakaoShareButton;
