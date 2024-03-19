import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { QuizInterface } from "./Quizes";
import { NotificationType, useNotifications } from "../context/NotificationsContext";
import { useUserInfo } from "../context/UserContext";
import { useCompletedQuizes } from "../context/CompletedQuizesContext";
import { TickSVG } from "../assets/SVG/TickSVG";
import { DeleteQuiz } from "../components/DeleteQuiz";

export const QuizInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo, updateUserScore } = useUserInfo();
  const [quizInfo, setQuizInfo] = useState<QuizInterface | null>(null);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [isQuizOver, setIsQuizOver] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [maxQuestions, setMaxQuestions] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const { PushNotifictionMessage } = useNotifications();
  const {addCompletedQuiz,completedQuizes} = useCompletedQuizes();

  useEffect(() => {
    getQuizInfo();
  }, []);
  useEffect(() => {
    console.log(userScore);
  }, [userScore]);
  async function getQuizInfo() {
    if (id) {
      const docRef = doc(db, "Quizes", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data() !== undefined) {
        {
          setQuizInfo(docSnap.data() as QuizInterface);
          setMaxQuestions(docSnap.data()?.Questions.length);
          setSelectedAnswers(Array(docSnap.data()?.Questions.length).fill(""));
        }
      }
    }
  }
  function NextQuestion() {
    quizInfo?.Questions[currentQuestion].Answers.forEach((answer) => {
      if (answer.AnswerText === selectedAnswers[currentQuestion]) {
        if (answer.IsCorrect) {
          setUserScore(userScore + 1);
        }
      }
    });
    if (selectedAnswers[currentQuestion] !== "") {
      if (currentQuestion + 1 === maxQuestions) {
        setIsQuizOver(true);
        setCurrentQuestion(0);
        setStartQuiz(false);
        setTimeout(() => {
          submitQuiz();
        }, 1000);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      PushNotifictionMessage("Please select an answer", NotificationType.Error);
    }
  }
  const submitQuiz = async () => {
    if(id){
      if(!completedQuizes.includes(id)){
        const newScore = Number(userInfo.score) + userScore * 10;
    
        updateUserScore(newScore);
        try {
          await setDoc(doc(db, "userScores", userInfo.uid), {
            Score: newScore,
          });
        } catch (e) {
          console.error(e);
        }
        try{
            addCompletedQuiz(userInfo.uid,id);
        }catch(e){
          console.log(e);
        }
      }else{
        PushNotifictionMessage("You have already completed this quiz, you wont get any extra points!", NotificationType.Error);
      }
    }
  };
  return (
    <div className="md:w-[500px] w-[90%] mx-auto min-h-[400px] pb-5 rounded-md bg-secondary mt-16">
      {!startQuiz ? (
        <div className={`${isQuizOver ? "hidden" : ""}`}>
          <p className="font-bold text-PrimaryText text-[25px] text-center">{quizInfo?.Name}</p>
          {
            quizInfo?.UserId!==undefined?<><DeleteQuiz quizUserId={quizInfo?.UserId} userId={userInfo.uid} /></>:<></>
          }
          
          <div className="w-[80%] flex place-content-between mx-auto mt-[10px]">
            <p className="text-[12px]">Created:{quizInfo?.CreatedAt.toString().substring(0, 10)}</p>
            <p className="text-[12px]">By:{quizInfo?.CreatedBy}</p>
          </div>
          <div className="md:w-[350px] w-[90%] md:h-[300px] h-[200px] mx-auto mt-[10px]">
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
        </div>
      ) : (
        <>
          <div className="w-[100%] h-[70px] rounded-t-md bg-PrimaryText">
            <p className="text-gray-200 text-center font-bold text-[25px] pt-[15px]">
              Question {currentQuestion + 1} out of {quizInfo?.Questions.length}
            </p>
          </div>
          <p className="text-center text-[20px] pt-5 font-bold w-[90%] mx-auto">{quizInfo?.Questions[currentQuestion].QuestionName}</p>
          <div className="mt-5">
            {quizInfo?.Questions[currentQuestion].Answers.map((answer, index) => (
              <div
                key={index}
                className={`w-[90%] mx-auto h-[50px] bg-mainBg hover:cursor-pointer grid place-content-center rounded-md mt-[10px] hover:border-2 border-PrimaryText ${
                  selectedAnswers[currentQuestion] == answer.AnswerText ? "border border-4 border-green-600" : ""
                }`}
                onClick={() => {
                  setSelectedAnswers((prevAnswers) => {
                    const newAnswers = [...prevAnswers];
                    newAnswers[currentQuestion] = answer.AnswerText;
                    return newAnswers;
                  });
                }}
              >
                <p className="">{answer.AnswerText}</p>
              </div>
            ))}
          </div>
          <div className="w-[120px] h-[40px] mx-auto mt-5">
            <button className="w-[100%] h-[100%] bg-PrimaryText rounded-md text-gray-200" onClick={NextQuestion}>
              {currentQuestion === maxQuestions - 1 ? "Finish quiz" : "Next question"}
            </button>
          </div>
        </>
      )}
      {isQuizOver ? (
        <div>
          <p className="text-center font-bold text-[35px] text-PrimaryText pt-5">Quiz Complete</p>
          <p className="text-center font-bold text-[20px] text-PrimaryText pt-5">Congratulations!</p>
          <div className="w-[170px] h-[170px] mx-auto rounded-full bg-gray-100 grid place-content-center mt-5 mb-5">
            <TickSVG width={150} height={150} fill="#00873E" />
          </div>
          <p className="text-center font-bold text-[20px] text-PrimaryText">
            Your Score: {userScore} out of {quizInfo?.Questions.length}
          </p>
          <div className="w-[150px] h-[35px] mx-auto mt-5">
            <button onClick={()=>navigate("/quizes")} className="w-[100%] h-[100%] rounded-md bg-PrimaryText text-gray-100 hover:bg-PrimaryText/80 font-bold">Back to quizzes</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
