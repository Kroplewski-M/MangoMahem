import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

interface CompletedQuizesProvider {
    completedQuizes: string[];
    addCompletedQuiz: (userId:string,quizId: string) => void;
    fetchCompletedQuizes: (userId:string) => void;  
    removeCompletedQuizes: () => void; 
}

interface CompletedQuizesProviderProps {
    children: ReactNode;
}

const CompletedQuizesProvider = createContext({} as CompletedQuizesProvider);

export const useCompletedQuizes = () => {
    return useContext(CompletedQuizesProvider);
};

export const CompletedQuizesContext = ({ children }: CompletedQuizesProviderProps) => {
    const [completedQuizes, setCompletedQuizes] = useState<string[]>([]);

    useEffect(() => {console.log(completedQuizes)}, [completedQuizes]);
    const addCompletedQuiz = async (userId:string,quizId: string) => {
        //Update the database
        try{
            await setDoc(doc(db, "CompletedQuizes", `${userId}`), {
                CompletedQuizes: [...completedQuizes, quizId]
              });
        }catch(e){
            console.log(e);
        }
        //Update the state
        setCompletedQuizes([...completedQuizes, quizId]);
    }

    const fetchCompletedQuizes = async (userId:string) => {
        //Fetch the completed quizes from the database
        try{
            const docRef = doc(db, "CompletedQuizes", `${userId}`);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setCompletedQuizes(docSnap.data().CompletedQuizes);
            }else{
                console.log("No such document!");
            }
        }catch(e){
            console.log(e);
        }
    }

    const removeCompletedQuizes = () => {
        setCompletedQuizes([]);
    }

    return <CompletedQuizesProvider.Provider value={{completedQuizes,addCompletedQuiz,fetchCompletedQuizes,removeCompletedQuizes}} >{children}</CompletedQuizesProvider.Provider>;
}