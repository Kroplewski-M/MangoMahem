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
  const [questions, setQuestions] = useState<QuestionInterface[]>([
    {
      QuestionName: "",
      Answers: [
        { AnswerText: "", IsCorrect: false },
        { AnswerText: "", IsCorrect: false },
        { AnswerText: "", IsCorrect: false },
        { AnswerText: "", IsCorrect: false },
      ],
    },
  ]);

  const handleQuestionChange = (index:number,event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].QuestionName = event.target.value;
    setQuestions(newQuestions);
  }
  const handleAnswerChange = (questionIndex:number,answerIndex:number,event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers[answerIndex].AnswerText = event.target.value;
    setQuestions(newQuestions);
  }
  const addQuestion = () => {
    setQuestions([...questions, { QuestionName: "", Answers: [{ AnswerText: "", IsCorrect: false }] }]);
  }
  const addAnswer = (questionIndex:number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers.push({ AnswerText: "", IsCorrect: false });
    setQuestions(newQuestions);
  }
  const removeQuestion = (index:number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }
  const removeAnswer = (questionIndex:number,answerIndex:number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  }
  const SetAnswer = (questionIndex:number,answerIndex:number,IsCorrect:boolean) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers[answerIndex].IsCorrect = IsCorrect;
    setQuestions(newQuestions);
  }
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
