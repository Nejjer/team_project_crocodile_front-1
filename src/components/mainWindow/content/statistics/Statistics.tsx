import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../store/store";
import {getStatistics} from "../../../../store/web-slices/statistics_slice";
import styles from "./statistics.module.scss"
import {postGameProcessInfo, restartGame} from "../../../../store/web-slices/game_process_slice";
import {NICK_IN_STORAGE} from "../../../enterWindow/Enter";


const Statistics : React.FC = () => {
    const {currentAdmin} = useSelector((state : RootState) => state.selectReducer)
    const {mostSuccessDrawing, mostSuccessGuessing, winner} = useSelector((state : RootState) => state.statisticsReducer)
    const dispatch = useTypeDispatch();

    useEffect(() => {
        dispatch(getStatistics())
    },[])

    const restart = () => {
        dispatch(restartGame())
    }

    return (
        <div className={styles.boxWrapStatistics}>
            <p className={styles.text}>Лучший игрок: {winner}</p>
            <p className={styles.text}>Лучше всех рисовал: {mostSuccessDrawing}</p>
            <p className={styles.text}>Лучше всех угадывал: {mostSuccessGuessing}</p>
            {currentAdmin === sessionStorage.getItem(NICK_IN_STORAGE) && <button className={styles.button} onClick={restart}>Перезапустить игру</button>}
        </div>
    )
}

export default Statistics;