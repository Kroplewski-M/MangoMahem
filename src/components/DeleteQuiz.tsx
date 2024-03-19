import { useEffect, useState } from "react";

interface DeleteQuizProps {
    quizUserId: string;
    userId: string;
}

export const DeleteQuiz = ({quizUserId,userId}:DeleteQuizProps) => {
    const [isCreator, setIsCreator] = useState<boolean>(false);
    useEffect(() => {
        if(quizUserId === userId){
            setIsCreator(true);
        }
    }, []);

    return (
        <div className="w-[140px] mx-auto mt-[10px] mb-[10px]">
            <button className="w-[140px] h-[30px] rounded-md text-gray-200 font-bold hover:bg-red-700/80 bg-red-700">Delete Quiz</button>
        </div>
    )
}