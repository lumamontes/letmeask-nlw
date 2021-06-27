import { useParams } from 'react-router-dom';
import { Button } from '../components/Button'
import logoImg from '../assets/images/logo.svg';
import { RoomCode } from '../components/RoomCode'
import '../styles/room.scss';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../services/firebase';
import { parse } from 'path';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type RoomParams = {
    id: string;
}

type Question = {
    id: string;

    author: {
        name: string;
        avatar: string
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}
export function Room() {
    const { user } = useAuth()
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const fireabaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(fireabaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId])
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') {
            return;
        }
        if (!user) {
            throw new Error('erro');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user?.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
        toast.success('Pergunta enviada com sucesso!')

    }
    return (
        <div id="page-room">
            <div><Toaster /></div>
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={roomId}></RoomCode>
                </div>
            </header>
            <main className="content">

                <div className="room-title">
                    <h1>Sala {title} </h1>
                    {questions.length > 0 && <span> {questions.length} perguntas</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                        placeholder="O que você quer pergutnar?"
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>Faça o seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user} >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                {JSON.stringify(questions)};
            </main>

        </div >
    )
}