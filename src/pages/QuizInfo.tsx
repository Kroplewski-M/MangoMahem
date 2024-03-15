import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { QuizInterface } from "./Quizes";

export const QuizInfo = () => {
  const { id } = useParams();
  const [quizInfo, setQuizInfo] = useState<QuizInterface | null>(null);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [maxQuestions, setMaxQuestions] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);

  useEffect(() => {
    getQuizInfo();
  }, []);

  async function getQuizInfo() {
    if (id) {
      const docRef = doc(db, "Quizes", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data() !== undefined) {
        {
          setQuizInfo(docSnap.data() as QuizInterface);
          setMaxQuestions(docSnap.data()?.Questions.length);
        }
      }
    }
  }
  return (
    <div className="md:w-[500px] w-[90%] mx-auto min-h-[400px] pb-5 rounded-md bg-secondary mt-16">
      {!startQuiz ? (
        <>
          <p className="font-bold text-PrimaryText text-[25px] text-center">{quizInfo?.Name}</p>
          <div className="w-[80%] flex place-content-between mx-auto mt-[10px]">
            <p className="text-[12px]">Created:{quizInfo?.CreatedAt.toString().substring(0, 10)}</p>
            <p className="text-[12px]">By:{quizInfo?.CreatedBy}</p>
          </div>
          <div className="w-[350px] h-[300px] mx-auto mt-[10px]">
            <img src={quizInfo?.Image} alt={quizInfo?.Name} className="w-[100%] h-[100%] rounded-md" />
          </div>
          <div className="w-[80%] mx-auto mt-[20px]">
            <p className="text-primaryText">
              <span className="font-bold">Quiz Description:</span> <br /> {quizInfo?.Description}
            </p>
          </div>
          <div className="w-[80%] mx-auto mt-5 h-[30px]">
            <button onClick={() => setStartQuiz(true)} className="w-[100px] h-[100%] rounded-md bg-PrimaryText hover:bg-PrimaryText/70 text-gray-100">
              Start Quiz
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-[100%] h-[70px] rounded-t-md bg-PrimaryText">
            <p className="text-gray-200 text-center font-bold text-[25px] pt-[15px]">
              Question {currentQuestion + 1} out of {quizInfo?.Questions.length}
            </p>
          </div>
          <p className="text-center text-[20px] pt-5 font-bold">{quizInfo?.Questions[currentQuestion].QuestionName} ?</p>
          <div className="mt-5">
            {quizInfo?.Questions[currentQuestion].Answers.map((answer, index) => (
              <div key={index} className="w-[90%] mx-auto h-[50px] bg-mainBg hover:cursor-pointer grid place-content-center rounded-md mt-[10px] hover:border-2 border-PrimaryText">
                <p className="">{answer.AnswerText}</p>
              </div>
            ))}
          </div>
          <div className="w-[120px] h-[40px] mx-auto mt-5">
            <button className="w-[100%] h-[100%] bg-PrimaryText rounded-md text-gray-200" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              next question
            </button>
          </div>
        </>
      )}
    </div>
  );
};
