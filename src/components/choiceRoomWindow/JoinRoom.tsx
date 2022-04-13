import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {useNavigate} from "react-router-dom";
import {useTypeDispatch} from "../../store/store";
import {ROOM_ID_IN_STORAGE} from "../../store/web-slices/chat_slice";
import {setAuth} from "../../store/web-slices/profile_slice";


function JoinRoom() {
    const [idRoom, setIdRoom] = useState('');
    const dispatch = useTypeDispatch();

    let navigate = useNavigate();
    const handleJoinRoom = () => {
        sessionStorage.setItem(ROOM_ID_IN_STORAGE, idRoom);
        dispatch(setAuth(true));
        navigate('/enter');
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleJoinRoom();
    }

    return (
        <div className={style.section + ' ' + style.joinRoom}>
            <div className={style.widget}>
                <>
                    <div>Индефикатор комнаты:</div>
                    <input className={`${style.input} input`}
                           type="text"
                           value={idRoom}
                           onChange={e => setIdRoom(e.target.value)}
                           onKeyPress={e => handlePressEnter(e)}
                    />
                </>

                <button className={`${style.button} btn`} onClick={handleJoinRoom}>Присоединиться</button>
            </div>

        </div>)

}

export default JoinRoom;

