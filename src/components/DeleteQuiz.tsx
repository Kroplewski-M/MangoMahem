import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { NotificationType, useNotifications } from "../context/NotificationsContext";

interface DeleteQuizProps {
    quizUserId: string;
    userId: string;
    image: string;
    quizId: string;
}

export const DeleteQuiz = ({quizUserId,userId,image,quizId}:DeleteQuizProps) => {
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const {PushNotifictionMessage} = useNotifications();
    const navigate = useNavigate();
    useEffect(() => {
        if(quizUserId === userId){
            setIsCreator(true);
        }
        console.log(quizId);
    }, []);
    const deleteQuiz = async()  => {
        // Delete the quiz from the database
        const path = extractImagePath(image);
        if(path){
            const storageRef = ref(storage, path);
            await deleteObject(storageRef).then(() => {
                console.log("Image deleted successfully");
            }).catch((error) => {
                console.log("Error deleting image",error);
                PushNotifictionMessage("Error deleting quiz", NotificationType.Error);
            });
        }   
        await deleteDoc(doc(db, "Quizes", quizId)).then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
            PushNotifictionMessage("Error deleting quiz", NotificationType.Error);
        });
        PushNotifictionMessage("Quiz deleted successfully", NotificationType.Success);
        navigate("/quizes");
    }
    const extractImagePath = (url:string) => {
        // Extract path from the URL
        const startIndex = url.indexOf('/o/') + 3; // Index of '/o/' + 3
        const endIndex = url.indexOf('?'); // Index of '?' (if any)
        if (startIndex !== -1 && endIndex !== -1) {
          return url.substring(startIndex, endIndex);
        } else if (startIndex !== -1) {
          return url.substring(startIndex);
        }
        return null;
      };
    return (
        <div className="w-[140px] mx-auto mt-[10px] mb-[10px]">
            {
                isCreator?<button className="w-[140px] h-[30px] rounded-md text-gray-200 font-bold hover:bg-red-700/80 bg-red-700" onClick={()=>setIsDeleting(true)}>Delete Quiz</button>:<></>         
            }
            {
                isDeleting?<>
                <div className="absolute w-[100vw] h-[100vh] top-0 left-0 backdrop-blur-sm pt-16">
                    <div className="w-[350px] pb-10 bg-PrimaryText rounded-md mx-auto mt-16">
                        <p className="text-center w-[80%] mx-auto font-bold text-gray-200 text-[20px] pt-5">Are you sure you want to delete this quiz?</p>
                        <div className="w-[220px] h-[35px] mx-auto mt-10">
                            <button className="w-[100px] h-[100%] bg-mainBg hover:bg-mainBg/80 font-bold rounded-md mr-[10px]" onClick={()=>setIsDeleting(false)}>Cancel</button>
                            <button className="w-[100px] h-[100%] bg-red-700 hover:bg-red-700/80 text-gray-200 font-bold rounded-md" onClick={deleteQuiz}>Delete</button>
                        </div>
                    </div>
                </div>
                </>:<></>
            }
        </div>
    )
}