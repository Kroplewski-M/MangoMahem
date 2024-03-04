import { useState } from "react";

interface AnswerInterface {
  Id: string;
  AnswerText: string;
  IsCorrect: boolean;
}
interface QuestionInterface {
  Id: string;
  QuestionName: string;
  Answers: AnswerInterface[];
}

export const CreateQuiz = () => {
  const [questions, setQuestions] = useState<QuestionInterface[]>([
    {
      Id: crypto.randomUUID(),
      QuestionName: "",
      Answers: [
        { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
        { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
        { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
      ],
    },
  ]);

  const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].QuestionName = event.target.value;
    setQuestions(newQuestions);
    console.log(questions);
  };
  const handleAnswerChange = (questionIndex: number, answerIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers[answerIndex].AnswerText = event.target.value;
    setQuestions(newQuestions);
    console.log(questions);
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        Id: crypto.randomUUID(),
        QuestionName: "",
        Answers: [
          { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
          { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
          { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
        ],
      },
    ]);
  };
  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers.push({ Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false });
    setQuestions(newQuestions);
  };
  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    var updatedAnswers = [...newQuestions[questionIndex].Answers];
    updatedAnswers.splice(answerIndex, 1);

    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      Answers: updatedAnswers,
    };
    setQuestions(newQuestions);
  };
  const SetAnswer = (questionIndex: number, answerIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers[answerIndex].IsCorrect = event.target.checked;
    setQuestions(newQuestions);
    console.log(questions);
  };
  return (
    <div className="w-[500px] mx-auto rounded bg-secondary pb-5">
      <h1 className="font-bold text-[30px] mt-5 text-center text-PrimaryText">Create Quiz</h1>

      <div className="w-[300px] mx-auto mt-5">
        <label htmlFor="Name" className="font-bold text-PrimaryText">
          Quiz Name:
        </label>
        <input type="text" className="w-[100%] bg-mainBg rounded-md h-[40px] block ps-[5px] mt-[5px]" placeholder="Mango Quiz" />
      </div>
      {questions.map((question, questionIndex) => (
        <div className="w-[300px] mx-auto mt-10" key={question.Id}>
          <p className="hover:cursor-pointer text-red-500" onClick={() => removeQuestion(questionIndex)}>
            Delete Question
          </p>
          <label htmlFor="question" className="font-bold text-PrimaryText">
            Question {questionIndex + 1}:{" "}
          </label>
          <input
            type="text"
            name="question"
            className="w-[300px] block h-[35px] rounded-md pl-[5px] mt-[5px]  bg-mainBg focus:outline-none"
            placeholder="Which country grows the most mangos?"
            onChange={(e) => handleQuestionChange(questionIndex, e)}
          />
          <p className="font-bold text-PrimaryText mt-5">Answers:</p>
          {question.Answers.map((answer, answerIndex) => (
            <div key={answer.Id}>
              <div className="flex mt-5">
                <input
                  type="text"
                  name="answer"
                  className="w-[300px] block h-[35px] rounded-md pl-[5px] bg-mainBg focus:outline-none"
                  placeholder={`Answer ${answerIndex + 1}`}
                  onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                />
                <label htmlFor="correct" className="pl-[5px] text-mainBg">
                  correct?
                </label>
                <input type="checkbox" name="correct" className="w-[20px] h-[20px] rounded-md bg-mainBg ml-5 mt-[5px]" onChange={(event) => SetAnswer(questionIndex, answerIndex, event)} />
              </div>
              <p className="text-red-700 hover:cursor-pointer" onClick={() => removeAnswer(questionIndex, answerIndex)}>
                Delete
              </p>
            </div>
          ))}
          <div className="w-[100px] h-[35px]  mt-5">
            <button className="w-[100%] h-[100%] bg-PrimaryText text-gray-300 rounded-md hover:font-bold" onClick={() => addAnswer(questionIndex)}>
              Add Answer
            </button>
          </div>
        </div>
      ))}
      <div className="w-[150px] h-[35px]  mt-10 ml-5">
        <button className="w-[100%] h-[100%] bg-PrimaryText text-gray-300 rounded-md hover:font-bold" onClick={addQuestion}>
          Add next Question
        </button>
      </div>
    </div>
  );
};
