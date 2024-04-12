import React from 'react';
import { useNavigate } from 'react-router-dom';
import MbtiQuestionData from '@assets/MbtiQuestionData';

function Question() {
  const [questionNo, setQuestionNo] = React.useState(0);
  const [totalScore, setTotalSore] = React.useState([
    { id: 'EI', score: 0 },
    { id: 'SN', score: 0 },
    { id: 'TF', score: 0 },
    { id: 'JP', score: 0 },
  ]);
  const navigate = useNavigate();

  const handleClickButton = (no, type) => {
    const newScore = totalScore.map(s =>
      s.id === type ? { id: s.id, score: s.score + no } : s,
    );
    // 기존의 배열을 newScore라는 값으로 바꿔줌
    setTotalSore(newScore);
    // 다음 문제로 문제수 증가
    if (MbtiQuestionData.length !== questionNo + 1) {
      setQuestionNo(questionNo + 1);
    } else {
      //mbti도출(reduce)
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        '',
      );
      console.log('mbti', mbti);
      //마지막 문제(12번째 문제)에서 result 페이지로 넘어가게
      navigate('/mbti/result');
    }
  };

  return (
    <div className="m-8 flex gap-4 flex-col items-center">
      <h1 className="text-3xl font-bold">날씨별 성격 테스트</h1>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div className="bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full style ={{width: 45%}}">
          {' '}
          45%
        </div>
      </div>

      <div>{MbtiQuestionData[questionNo].title}</div>
      <button
        onClick={() => handleClickButton(1, MbtiQuestionData[questionNo].type)}
        className="rounded bg-primary px-4 py-2 font-bold text-white"
      >
        {MbtiQuestionData[questionNo].answer1}
      </button>
      <button
        onClick={() => handleClickButton(0, MbtiQuestionData[questionNo].type)}
        className="rounded bg-primary px-4 py-2 font-bold text-white "
      >
        {MbtiQuestionData[questionNo].answer2}
      </button>
    </div>
  );
}

export default Question;
