import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss';
import toast from 'react-hot-toast';
type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
        toast.success('Copiado!', {
            icon: '✨',
        })
    }
    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span> Sala #{props.code}</span>

        </button>
    )
}