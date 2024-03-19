import { TickSVG } from "../assets/SVG/TickSVG";
import { useCompletedQuizes } from "../context/CompletedQuizesContext";
import { QuizInterface } from "../pages/Quizes";

interface QuizCardInterface {
  QuizInfo: QuizInterface;
}

export const QuizCard = ({ QuizInfo }: QuizCardInterface) => {
  const {completedQuizes} = useCompletedQuizes();

  return (
    <div className="mr-5 mb-5 rounded-md w-[300px] h-[300px] bg-red-100 relative hover:cursor-pointer transition ease-in-out hover:scale-110">
      <div className={`absolute top-2 right-2 z-[20] w-[50px] h-[50px] bg-green-700 rounded-full grid place-content-center ${completedQuizes.includes(QuizInfo.Id)?"":"hidden"}`}>
        <TickSVG width={30} height={30} fill="#FFFFFF" />
      </div>
      <div className="h-[60%] w-[100%] bg-[#333333] rounded-t-md">
        <img src={QuizInfo.Image} alt="quiz" className="w-[100%] h-[100%] rounded-t-md" />
      </div>
      <div className="h-[40%] w-[100%] rounded-b-md bg-secondary relative">
        <div className="bg-secondary flex flex-wrap pt-[5px] pl-[5px]">
          {QuizInfo.Categories.map((category, index) => (
            <div key={index} className="bg-red-500 rounded-full text-gray-200 text-[10px] px-2 py-1 mr-[5px]">
              {category}
            </div>
          ))}
        </div>
        <h1 className="font-bold text-[20px] text-center text-PrimaryText pt-[10px]">{QuizInfo.Name}</h1>
        <div className="flex absolute bottom-5 left-0 place-content-around w-[100%] text-PrimaryText">
          <p className="text-[10px]">created: {QuizInfo.CreatedAt.toString().substring(0, 10)}</p>
          <p className="text-[10px]">by: {QuizInfo.CreatedBy}</p>
        </div>
      </div>
    </div>
  );
};
