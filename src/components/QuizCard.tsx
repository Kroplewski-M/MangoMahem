import { TickSVG } from "../assets/SVG/TickSVG";

// interface QuizCardInterface {}

export const QuizCard = () => {
  return (
    <div className="mr-5 mb-5 rounded-md w-[300px] h-[300px] bg-red-100 relative hover:cursor-pointer transition ease-in-out hover:scale-110">
      <div className="absolute top-2 right-2 z-[20] w-[50px] h-[50px] bg-green-700 rounded-full grid place-content-center hidden">
        <TickSVG width={30} height={30} fill="#FFFFFF" />
      </div>
      <div className="h-[50%] w-[100%] bg-[#333333] rounded-t-md"></div>
      <div className="h-[50%] w-[100%] rounded-b-md bg-secondary grid place-content-center align-content-center relative">
        <h1 className="font-bold text-[20px] -mt-6">World countries quiz</h1>
        <div className="flex absolute bottom-5 left-0 place-content-around w-[100%]">
          <p className="text-[10px]">created: 12/05/2022</p>
          <p className="text-[10px]">by: Mateusz Kroplewski</p>
        </div>
      </div>
    </div>
  );
};
