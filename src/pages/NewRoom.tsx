import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';

export function NewRoom() {
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
                    <h2>Criar uma nova sala</h2>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>

                    <p>Quer entrar em uma sala existente? <a href="#">Clique aqui</a></p>
                </div>
            </main>
        </div>
    )
}