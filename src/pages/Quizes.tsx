import { useEffect, useState } from "react";
import { AddSVG } from "../assets/SVG/AddSVG";
import { SearchSVG } from "../assets/SVG/SearchSVG";
import { QuizCard } from "../components/QuizCard";
import { useNavigate } from "react-router-dom";
import { QuestionInterface } from "./CreateQuiz";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CloseSVG } from "../assets/SVG/CloseSVG";
import { useUserInfo } from "../context/UserContext";
import { useCompletedQuizes } from "../context/CompletedQuizesContext";

export interface QuizInterface {
  Id: string;
  Name: string;
  Questions: QuestionInterface[];
  CreatedAt: Date;
  Description: string;
  Categories: string[];
  CreatedBy: string;
  UserId: string;
  Image: string;
}
export const Quizes = () => {
  const navigate = useNavigate();
  const {userInfo} = useUserInfo();
  const {completedQuizes} = useCompletedQuizes();
  const [searchQuizes, setSearchQuizes] = useState<string>("");
  const [quizes, setQuizes] = useState<QuizInterface[]>([]);
  const [filteredQuizes, setFilteredQuizes] = useState<QuizInterface[]>([]);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  
  async function getQuizes() {
    setQuizes([]);
    const querySnapshot = await getDocs(collection(db, "Quizes"));
    querySnapshot.forEach((doc) => {
      const quizData = doc.data() as QuizInterface;
      const quizWithId = { ...quizData, Id: doc.id };
      setQuizes((prevQuizes) => [...prevQuizes, quizWithId]);
      setFilteredQuizes((prevQuizes) => [...prevQuizes, quizWithId]);
    });
    setHasLoaded(true);
  }

  useEffect(() => {
    getQuizes();
  }, []);

  useEffect(() => {
    setFilteredQuizes(quizes.filter((quiz) => quiz.Name.toLowerCase().includes(searchQuizes.toLowerCase())));
    if (searchQuizes == "") {
      setFilteredQuizes(quizes);
    }
  }, [searchQuizes]);
  const [FilterQuiz, setFilterQuiz] = useState<string>("All");
  useEffect(()=>{
    if(FilterQuiz == "Your"){
      setFilteredQuizes(quizes.filter((quiz) => quiz.UserId == userInfo.uid));
    }
    else if(FilterQuiz == "Completed"){
      setFilteredQuizes(quizes.filter((quiz) => completedQuizes.includes(quiz.Id)));
    }
    else{
      setFilteredQuizes(quizes);
    }
  },[FilterQuiz])
  return (
    <div className="md:px-16 pt-5">
      <div className="flex flex-col md:flex-row">
        <div className="flex rounded bg-PrimaryText md:w-[340px] w-[90%] pl-[5px] ml-[3px] md:ml-0">
          <div className="w-[30px] height-[30px] flex self-center">
            <SearchSVG width={30} height={30} fill="#FFA466" />
          </div>
          <div className="flex">
            <input
              type="text"
              className="md:w-[300px] w-[80%] h-[40px] ml-[5px] text-gray-200 font-bold rounded-md pl-[5px] bg-transparent focus:outline-none"
              placeholder="Search for a quiz"
              value={searchQuizes}
              onChange={(e) => setSearchQuizes(e.target.value)}
            />
            <div className={`w-[20px] h-[20px] rounded-full bg-red-700 hover:cursor-pointer ml-[5px] mt-[7px] ${searchQuizes == "" ? "hidden" : ""}`} onClick={() => setSearchQuizes("")}>
              <CloseSVG width={20} height={20} fill="#FFFFFF" />
            </div>
          </div>
        </div>
        <div className="md:ml-10 ml-[2px] mt-5 md:mt-0 bg-secondary rounded hover:bg-secondary/90 w-[200px]" onClick={() => navigate("/create-quiz")}>
          <button className="rounded px-5 py-3  flex">
            <AddSVG width={20} height={20} fill="#46230A" />
            <span className="pl-[5px] font-bold text-PrimaryText"> Create A Quiz </span>
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="Filter" className="font-bold text-PrimaryText text-[20px] mr-[10px] block md:inline mt-5 md:mt-0">Filter:</label>
        <select name="Filter" className="w-[200px] h-[30px] md:mt-5 bg-PrimaryText rounded-md text-gray-100 font-bold pl-[10px]" onChange={(e)=>setFilterQuiz(e.target.value)}>
          <option value="All" selected>All Quizzes</option>
          <option value="Your">Your Quizzes</option>
          <option value="Completed">Completed Quizzes</option>
        </select>
      </div>
      <h1 className="font-bold text-[27px] text-PrimaryText mt-5">Quizzes</h1>
      <div className="mt-5 w-[100%] flex flex-wrap flex-col md:flex-row place-content-center md:place-content-start">
        {!hasLoaded ? (
          <p className="font-bold text-PrimaryText text-[20px]">Loading...</p>
        ) : (
          <div>{filteredQuizes.length == 0 ? <p className="font-bold text-PrimaryText text-[20px]">No Quizes Found</p> : ""}</div>
        )}
        {filteredQuizes.map((quiz, index) => (
          <div key={index} onClick={() => navigate(`/quizInfo/${quiz.Id}`)}>
            <QuizCard QuizInfo={quiz} />
          </div>
        ))}
      </div>
    </div>
  );
};
