import { useState } from "react";
import { NotificationType, useNotifications } from "../context/NotificationsContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AddSVG } from "../assets/SVG/AddSVG";
import { useUserInfo } from "../context/UserContext";

interface AnswerInterface {
  Id: string;
  AnswerText: string;
  IsCorrect: boolean;
}
export interface QuestionInterface {
  Id: string;
  QuestionName: string;
  Answers: AnswerInterface[];
}

export const CreateQuiz = () => {
  const { PushNotifictionMessage } = useNotifications();
  const {userInfo} = useUserInfo();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState<File | null>(null);

  const [questions, setQuestions] = useState<QuestionInterface[]>([
    {
      Id: crypto.randomUUID(),
      QuestionName: "",
      Answers: [
        { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
        { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
        { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
      ],
    },
  ]);

  const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].QuestionName = event.target.value;
    setQuestions(newQuestions);
  };
  const handleAnswerChange = (questionIndex: number, answerIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers[answerIndex].AnswerText = event.target.value;
    setQuestions(newQuestions);
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        Id: crypto.randomUUID(),
        QuestionName: "",
        Answers: [
          { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
          { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
          { Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false },
        ],
      },
    ]);
  };
  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers.push({ Id: crypto.randomUUID(), AnswerText: "", IsCorrect: false });
    setQuestions(newQuestions);
  };
  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    var updatedAnswers = [...newQuestions[questionIndex].Answers];
    updatedAnswers.splice(answerIndex, 1);

    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      Answers: updatedAnswers,
    };
    setQuestions(newQuestions);
  };
  const SetAnswer = (questionIndex: number, answerIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Answers[answerIndex].IsCorrect = event.target.checked;
    setQuestions(newQuestions);
  };
  const completeQuiz = () => {
    console.log(questions);
    if (questions.length === 0) {
      PushNotifictionMessage("Please add at least one question", NotificationType.Error);
    }
    if (questions.some((question) => question.QuestionName === "")) {
      PushNotifictionMessage("Please fill out all the question name fields", NotificationType.Error);
    }
    if (questions.some((question) => question.Answers.length < 2)) {
      PushNotifictionMessage("Please add at least 2 answers to each question", NotificationType.Error);
    }
    if (questions.some((question) => question.Answers.some((answer) => answer.AnswerText === ""))) {
      PushNotifictionMessage("Please fill out all the answer fields", NotificationType.Error);
    }
    if (questions.some((question) => question.Answers.filter((answer) => answer.IsCorrect).length === 0)) {
      PushNotifictionMessage("Please select at least one correct answer for each question", NotificationType.Error);
    }
    if (quizName === "") {
      PushNotifictionMessage("Please fill out the quiz name field", NotificationType.Error);
    }
    if (quizImage === null) {
      PushNotifictionMessage("Please upload a quiz image", NotificationType.Error);
    }
    if (categories.length === 0) {
      PushNotifictionMessage("Please add a category", NotificationType.Error);
    }
    if (quizDescription === "") {
      PushNotifictionMessage("Please fill out the quiz description field", NotificationType.Error);
    } else if (
      questions.length > 0 &&
      questions.every((question) => question.QuestionName !== "" && question.Answers.length > 1 && question.Answers.every((answer) => answer.AnswerText !== "")) &&
      questions.every((question) => question.Answers.some((answer) => answer.IsCorrect)) &&
      quizName !== "" &&
      quizImage !== null &&
      quizDescription !== "" &&
      categories.length > 0
    ) {
      PushNotifictionMessage("Creating Quiz...", NotificationType.Success);
      addQuizToDatabase();
    }
  };
  const handleQuizImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setQuizImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };
  const metadata = {
    contentType: "image/jpeg",
  };
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const addQuizToDatabase = async () => {
    setCreatingQuiz(true);
    var imgLink = "";
    try {
      if (quizImage != null) {
        const storageRef = ref(storage, uuidv4());
        const uploadTask = await uploadBytesResumable(storageRef, quizImage, metadata);
        const downloadUrl = await getDownloadURL(uploadTask.ref);
        imgLink = downloadUrl;
      }
    } catch (e) {
      PushNotifictionMessage("Error creating quiz...", NotificationType.Error);
    }
    try {
      await setDoc(doc(db, "Quizes", crypto.randomUUID()), {
        Name: quizName,
        Description: quizDescription,
        Image: imgLink,
        Questions: questions,
        Categories: categories,
        CreatedAt: new Date().toISOString(),
        CreatedBy: userInfo.displayName,
      });
    } catch (e) {
      PushNotifictionMessage("Error creating quiz...", NotificationType.Error);
    } finally {
      setCreatingQuiz(false);
    }
    PushNotifictionMessage("Quiz created successfully...", NotificationType.Success);
    navigate("/quizes");
  };
  const [category, setCategory] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);
  const addCategory = () => {
    if (category) {
      setCategories([...categories, category]);
      setCategory("");
    }
  };
  return (
    <div className="w-[98%] md:w-[500px] mx-auto rounded bg-secondary pb-5">
      <h1 className="font-bold text-[30px] mt-5 text-center text-PrimaryText">Create Quiz</h1>

      <div className="w-[300px] mx-auto mt-5">
        <div className="flex flex-wrap">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-between bg-mainBg p-2 rounded-md mr-[5px] mt-[5px]">
              <p className="text-PrimaryText">{category}</p>
              <button className="w-[30px] h-[30px] rounded-md bg-mainBg flex place-content-center pt-[5px]" onClick={() => setCategories(categories.filter((c) => c !== category))}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="categories" className="font-bold text-PrimaryText">
            Add Categories
          </label>
          <div className="flex">
            <input type="text" className="w-[80%] bg-mainBg rounded-md h-[40px] block ps-[5px] mt-[5px]" placeholder="Fruits" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button className="w-[30px] h-[30px] rounded-md bg-mainBg flex place-content-center pt-[5px] ml-5 mt-[5px]" onClick={addCategory}>
              <AddSVG width={20} height={20} fill="#333333" />
            </button>
          </div>
        </div>
        <div>
          {imageUrl && <img src={imageUrl} alt="quiz" className="w-[100%] h-[200px] object-cover rounded-md mt-[5px]" />}
          <label htmlFor="QuizImg" className="font-bold text-PrimaryText">
            Quiz Image:
          </label>
          <input type="file" accept="image/*" onChange={handleQuizImageChange} className="w-[100%] bg-mainBg rounded-md h-[40px] block ps-[5px] mt-[5px]" />
        </div>
        <div>
          <label htmlFor="Name" className="font-bold text-PrimaryText">
            Quiz Name:
          </label>
          <input type="text" className="w-[100%] bg-mainBg rounded-md h-[40px] block ps-[5px] mt-[5px]" placeholder="Mango Quiz" value={quizName} onChange={(e) => setQuizName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="Description" className="font-bold text-PrimaryText">
            Quiz Description:
          </label>
          <textarea
            className="w-[100%] bg-mainBg rounded-md h-[100px] block ps-[5px] mt-[5px]"
            placeholder="This quiz is about mangos"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          />
        </div>
      </div>
      {questions.map((question, questionIndex) => (
        <div className="w-[300px] mx-auto mt-10" key={question.Id}>
          <p className="hover:cursor-pointer text-red-700" onClick={() => removeQuestion(questionIndex)}>
            Delete Question
          </p>
          <label htmlFor="question" className="font-bold text-PrimaryText">
            Question {questionIndex + 1}:{" "}
          </label>
          <input
            type="text"
            name="question"
            className="w-[300px] block h-[35px] rounded-md pl-[5px] mt-[5px]  bg-mainBg focus:outline-none"
            placeholder="Which country grows the most mangos?"
            onChange={(e) => handleQuestionChange(questionIndex, e)}
          />
          <p className="font-bold text-PrimaryText mt-5">Answers:</p>
          {question.Answers.map((answer, answerIndex) => (
            <div key={answer.Id}>
              <div className="flex mt-5">
                <input
                  type="text"
                  name="answer"
                  className="w-[300px] block h-[35px] rounded-md pl-[5px] bg-mainBg focus:outline-none"
                  placeholder={`Answer ${answerIndex + 1}`}
                  onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                />
                <label htmlFor="correct" className="pl-[5px] text-mainBg">
                  correct?
                </label>
                <input type="checkbox" name="correct" className="w-[20px] h-[20px] rounded-md bg-mainBg ml-5 mt-[5px]" onChange={(event) => SetAnswer(questionIndex, answerIndex, event)} />
              </div>
              <p className="text-red-700 hover:cursor-pointer" onClick={() => removeAnswer(questionIndex, answerIndex)}>
                Delete
              </p>
            </div>
          ))}
          <div className="w-[100px] h-[35px]  mt-5">
            <button className="w-[100%] h-[100%] bg-PrimaryText text-gray-300 rounded-md hover:font-bold" onClick={() => addAnswer(questionIndex)}>
              Add Answer
            </button>
          </div>
        </div>
      ))}
      <div className="w-[320px] h-[35px]  mt-10 ml-5 flex">
        <button className="w-[150px] h-[35px] mr-2 bg-PrimaryText text-gray-300 rounded-md hover:font-bold" onClick={addQuestion}>
          Add Question
        </button>
        <button className="w-[150px] h-[35px] bg-PrimaryText text-gray-300 rounded-md hover:font-bold" disabled={creatingQuiz} onClick={completeQuiz}>
          Finish Quiz
        </button>
      </div>
    </div>
  );
};
