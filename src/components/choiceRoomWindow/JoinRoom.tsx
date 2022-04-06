import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {useNavigate} from "react-router-dom";
import {useTypeDispatch} from "../../store/store";
import {joinToRoom, ROOM_NAME_IN_STORAGE} from "../../store/web-slices/chat_slice";


function JoinRoom() {
    const [idRoom, setIdRoom] = useState('');
    const dispatch = useTypeDispatch();

    let navigate = useNavigate();
    const handleJoinRoom = () => {
        dispatch(joinToRoom(idRoom));
        sessionStorage.setItem(ROOM_NAME_IN_STORAGE, idRoom);
        navigate('/game');
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleJoinRoom();
    }

    return (
        <div className={style.section + ' ' + style.joinRoom}>
            <div className={style.widget}>
                <div>Индефикатор комнаты:</div>
                <input className={style.input + " input"}
                       type="text"
                       value={idRoom}
                       onChange={e => setIdRoom(e.target.value)}
                       onKeyPress={e => handlePressEnter(e)}
                />
                <button className={style.button + " btn"} onClick={handleJoinRoom}>Присоединиться</button>
            </div>

        </div>)

}

export default JoinRoom;

