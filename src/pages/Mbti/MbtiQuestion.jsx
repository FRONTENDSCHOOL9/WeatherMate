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
      <div className="min-w-[90vw] min-h-[700px] py-10 px-4 flex gap-10 flex-col items-center font-TTLaundryGothicB  lg:px-12 xl:px-60">
        <h1 className="text-2xl font-bold">다음 상황에서 당신의 선택은?</h1>
        <div className="w-full xl:w-[70vw] bg-gray-200 rounded-full ">
          <div
            className="bg-primary text-xs xl:text-s text-white text-center py-0.5 rounded-full"
            style={{ width: `${progress * 100}%` }}
          >
            {`${questionNo + 1}/${MbtiQuestionData.length}`}
          </div>
        </div>
        <div className="whitespace-pre-line flex flex-col gap-10 ">
          <div className="min-w-[70vw] text-center xl:px-40 min-h-[172px] border-4 text-xl text-gray-700 rounded-lg p-10 border-primary">
            {MbtiQuestionData[questionNo].title}
          </div>
          <button
            onClick={() =>
              handleClickButton(1, MbtiQuestionData[questionNo].type)
            }
            className="min-w-[360px] min-h-[76px] px-10 rounded-lg bg-white hover:bg-primary border-2 p-2 text-lg text-gray-700 font-bold "
          >
            {MbtiQuestionData[questionNo].answer1}
          </button>
          <button
            onClick={() =>
              handleClickButton(0, MbtiQuestionData[questionNo].type)
            }
            className="min-w-[360px] min-h-[76px] px-10 rounded-lg bg-white hover:bg-primary border-2 p-2 text-lg  text-gray-700 font-bold "
          >
            {MbtiQuestionData[questionNo].answer2}
          </button>
          {questionNo > 0 && (
            <button
              onClick={handleback}
              className="min-w-[360px]  px-10 rounded-lg bg-white hover:bg-primary border-2 p-2 text-lg text-gray-700  font-bold "
            >
              이전 문제 다시 풀기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MbtiQuestion;
