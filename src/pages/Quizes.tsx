import { AddSVG } from "../assets/SVG/AddSVG";
import { SearchSVG } from "../assets/SVG/SearchSVG";

export const Quizes = () => {
  return (
    <div className="md:px-16 pt-5">
      <div className="flex flex-col md:flex-row">
        <div className="flex rounded bg-PrimaryText w-[340px] pl-[5px] ml-[3px] md:ml-0">
          <div className="w-[30px] height-[30px] flex self-center">
            <SearchSVG width={30} height={30} fill="#FFA466" />
          </div>
          <div className="flex">
            <input type="text" className="w-[300px] h-[40px] ml-[5px] text-gray-200 font-bold rounded-md pl-[5px] bg-transparent focus:outline-none" placeholder="Search for a quiz" />
            <div className="w-[20px] h-[20px] rounded-full bg-red-700 hover:cursor-pointer ml-[5px] mt-[7px] hidden">
              <p className="text-gray-100 font-bold text-center pt-[2px] text-[12px]">X</p>
            </div>
          </div>
        </div>
        <div className="md:ml-10 ml-[2px] mt-5 md:mt-0 bg-secondary rounded hover:bg-secondary/90 w-[200px]">
          <button className="rounded px-5 py-3  flex">
            <AddSVG width={20} height={20} fill="#46230A" />
            <span className="pl-[5px] font-bold"> Create A Quiz </span>
          </button>
        </div>
      </div>
    </div>
  );
};
