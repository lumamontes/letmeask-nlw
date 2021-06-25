import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
export function Home() {
    const history = useHistory();

    function navigateToNewRoom() {
        history.push('/rooms/new')
    }
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Imagem de ilustração" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>TIre as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Imagem de logo LetmeAsk" />
                    <button 
                    className="create-room"
                    onClick={navigateToNewRoom}
                    >
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}