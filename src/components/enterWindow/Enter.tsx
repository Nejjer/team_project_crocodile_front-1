import React, {useState} from "react";
import {useTypeDispatch} from "../../store/store";
import {setName} from "../../store/web-slices/profile_slice";

function Enter({setOpen}: propsEnterWindow){
    const [nick, setNick] = useState('');
    const [isErrorMaxLen, setIsErrorMaxLenMaxLen] = useState(false);
    const [isErrorZeroInput, setIsErrorZeroInput] = useState(false);
    const dispatch = useTypeDispatch();

    const onChangeInput = (value: string) => {
        setIsErrorZeroInput(false);
        if (value.length > 15){
            setIsErrorMaxLenMaxLen(true);
        }else {
            setIsErrorMaxLenMaxLen(false);
            setNick(value);
        }
    }

    const handleClickBtn = () => {
        if (nick.length === 0){
            setIsErrorZeroInput(true);
            return;
        }
        setOpen(v => !v );
        dispatch(setName(nick))
    }

    const handlePressEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleClickBtn();
    }

    return (
        <div className="enter-window__enter">
            {isErrorMaxLen && <div className="enter-window__error-message">Слишком длинный ник</div>}
            {isErrorZeroInput && <div className="enter-window__error-message">Пустой ник</div>}
            <input placeholder="Введите свой ник"
                   className="enter-window__input"
                   type="text"
                   value={nick}
                   onChange={(e) => {onChangeInput(e.target.value)}}
                   onKeyPress={e => {handlePressEnter(e)}}
            />
            <button className="enter-window__btn btn" onClick={handleClickBtn}>Войти</button>
        </div>
    )
}

export default Enter;