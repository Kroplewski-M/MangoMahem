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
    <div>
      <h1>Quiz Info</h1>
      <p>{id}</p>
      <p>{maxQuestions}</p>
      <p>{quizInfo?.Name}</p>
    </div>
  );
};
