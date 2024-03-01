import { useEffect, useState } from "react";

interface AnswerInterface {
  AnswerText: string;
  IsCorrect: boolean;
}
interface QuestionInterface {
  QuestionName: string;
  Answers: AnswerInterface[];
}

export const CreateQuiz = () => {
  const [questionCount, setQuestionCount] = useState(2);
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);

  useEffect(() => {
    setQuestions([
      {
        QuestionName: "",
        Answers: [
          {
            AnswerText: "",
            IsCorrect: false,
          },
          {
            AnswerText: "",
            IsCorrect: false,
          },
          {
            AnswerText: "",
            IsCorrect: false,
          },
          {
            AnswerText: "",
            IsCorrect: false,
          },
        ],
      },
    ]);
  }, []);
  return (
    <div className="w-[500px] mx-auto rounded bg-secondary pb-5">
      <h1 className="font-bold text-[30px] mt-5 text-center text-PrimaryText">Create Quiz</h1>

      <div className="w-[300px] mx-auto mt-5">
        <label htmlFor="Name" className="font-bold text-PrimaryText">
          Quiz Name:
        </label>
        <input type="text" className="w-[100%] bg-mainBg rounded-md h-[40px] block ps-[5px] mt-[5px]" placeholder="Mango Quiz" />
      </div>
      {questions.map(() => (
        <p>hello</p>
      ))}
    </div>
  );
};
