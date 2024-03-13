import { useParams } from 'react-router-dom'

export const QuizInfo = () => {
    const {id} = useParams();
    return(<div>
        <h1>Quiz Info</h1>
        <p>{id}</p>
    </div>)
}