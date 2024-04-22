import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import MbtiQuestionData from '@assets/MbtiQuestionData';

import DetailPageHeader from '@components/layout/DetailPageHeader';

function MbtiQuestion() {
  const [questionNo, setQuestionNo] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState([
    { id: 'EI', score: 0 },
    { id: 'SN', score: 0 },
    { id: 'TF', score: 0 },
    { id: 'JP', score: 0 },
  ]);
  const navigate = useNavigate();

  //프로그래스바
  const progress = (questionNo + 1) / MbtiQuestionData.length;

  const handleClickButton = (no, type) => {
    const newScore = totalScore.map(s =>
      s.id === type ? { id: s.id, score: s.score + no } : s,
    );
    setTotalScore(newScore);
    // 다음 문제로 문제수 증가
    setQuestionNo(questionNo + 1);

    if (questionNo + 1 === MbtiQuestionData.length) {
      //mbti도출(reduce)
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        '',
      );
      console.log('mbti', mbti);
      // 마지막 질문인 경우 결과 페이지로 이동
      navigate({
        pathname: '/mbti/result',
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };
  const handleback = () => {
    //  이전 문제로 이동
    if (questionNo > 0) {
      setQuestionNo(questionNo - 1);
    }
  };

  return (
    <>
      <DetailPageHeader title={'날씨 성격 테스트'} />
      <div className="my-10 mx-10 flex gap-10 flex-col items-center font-TTLaundryGothicB">
        <h1 className="text-3xl font-bold"></h1>
        <div className="w-full bg-gray-200 min-w-96 rounded-full ">
          <div
            className="bg-primary text-xs  text-white text-center py-0.5 rounded-full"
            style={{ width: `${progress * 100}%` }}
          >
            {`${questionNo + 1}/${MbtiQuestionData.length}`}
          </div>
        </div>

        <div className=" min-w-96 border-4 text-xl text-gray-700 rounded-lg p-10 border-primary">
          <p>당신의 선택은?</p> <br />
          {MbtiQuestionData[questionNo].title}
        </div>
        <button
          onClick={() =>
            handleClickButton(1, MbtiQuestionData[questionNo].type)
          }
          className="min-w-96 rounded bg-white border-2 p-2 text-lg text-gray-700 font-bold "
        >
          {MbtiQuestionData[questionNo].answer1}
        </button>
        <button
          onClick={() =>
            handleClickButton(0, MbtiQuestionData[questionNo].type)
          }
          className="min-w-96 rounded bg-white border-2 p-2 text-lg  text-gray-700 font-bold "
        >
          {MbtiQuestionData[questionNo].answer2}
        </button>
        <button
          onClick={handleback}
          className="min-w-96 rounded bg-white border-2 p-2 text-lg text-gray-700 font-bold "
        >
          이전 문제 다시 풀기
        </button>
      </div>
    </>
  );
}

export default MbtiQuestion;
