import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import logoImg from '../assets/images/logo.svg';
import { RoomCode } from '../components/RoomCode'
import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../services/firebase';
import { parse } from 'path';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg'


type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const { user } = useAuth()
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
    const history = useHistory();

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
       if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
       }
    }

    return (
        <div id="page-room">
            <div><Toaster /></div>
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main className="content">

                <div className="room-title">
                    <h1>Sala {title} </h1>
                    {questions.length > 0 && <span> {questions.length} perguntas</span>}
                </div>


                <div className="question-list">

                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>

        </div >
    )
}