/* eslint-disable */
import moment from 'moment';

function getDay(day = 0) {
  return moment().add(day, 'days').format('YYYY.MM.DD');
}
function getTime(day = 0, second = 0) {
  return moment().add(day, 'days').add(second, 'seconds').format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq("user"),
        email: "hello@weathermate.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "김햇살",
        phone: "010-1234-1234",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          profileImage: 'uvi.svg',
        },
      },
    ],
    // 상품
    product: [],
    // 주문
    order: [],
    // 후기
    reply: [],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [],
    // QnA, 공지사항, 게시판
    post: [
        {
        _id: await nextSeq('post'),
        type: 'community',
        image: 'NiceWeather.jpg',
        user: {
          _id: 1,
          name: 'WeatherMate',
        },
        title: 'uvi',
        content: '오늘은 날씨가 참 좋네요!',
        replies: [
          {
            _id: 1,
            user: {
              _id: 2,
              name: 'Mate1',
            },
            content: '여기는 비가 와요.',
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user: {
              _id: 3,
              name: 'Mate2',
            },
            content: '좋은 하루 보내세요!.',
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
    ],

    // 코드
    code: [],
    // 설정
    config: [],
  };
};