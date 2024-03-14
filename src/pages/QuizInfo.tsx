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
    <div className="md:w-[400px] w-[90%] mx-auto min-h-[400px] pb-5 rounded-md bg-secondary mt-16">
      {!startQuiz ? (
        <>
          <p className="font-bold text-PrimaryText text-[25px] text-center">{quizInfo?.Name}</p>
          <div className="w-[80%] flex place-content-around mx-auto mt-[10px]">
            <p className="text-[12px]">Created:{quizInfo?.CreatedAt.toString().substring(0, 10)}</p>
            <p className="text-[12px]">By:{quizInfo?.CreatedBy}</p>
          </div>
          <div className="w-[250px] h-[200px] mx-auto mt-[10px]">
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
        <></>
      )}
    </div>
  );
};
