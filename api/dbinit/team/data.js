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
        email: "test@weathermate.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "Tester",
        phone: "010-1234-1234",
        address: "서울시 종로구 종로3길 127",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: "01-01",
          profileImage: 'uvi.svg',
        },
      },
      {
        _id: await nextSeq("user"),
        email: "hello@weathermate.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "김햇살",
        phone: "010-1234-1234",
        address: "서울시 송파구 잠실동",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: "12-04",
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
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 1,
          name: 'Tester',
        },
        title: 'uvi',
        content: '테스트용 게시글입니다.',
        replies: [
          {
            _id: 1,
            user: {
              _id: 2,
              name: 'Reply1',
            },
            content: '테스트 댓글입니다.',
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user: {
              _id: 3,
              name: 'Reply2',
            },
            content: '테스트 댓글입니다.',
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: 3,
            user: {
              _id: 4,
              name: 'Reply3',
            },
            content: '테스트 댓글입니다.',
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },

      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },

      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',

        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'community',
        image: '',
        product_id: 1,
        seller_id: 2,
        user: {
          _id: 2,
          name: 'Tester1',
        },
        title: 'manyClouds',
        content: '테스트용 게시글입니다.',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      

      

    ],

    // 코드
    code: [],
    // 설정
    config: [],
  };
};
