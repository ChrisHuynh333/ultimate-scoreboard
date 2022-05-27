import React from 'react'
import { useGlobalContext } from './context'

const Score = () => {
    const {totalScore, setTotalScore} = useGlobalContext();

    const changeScore = (score, index, action) => {
        const newScoreArray = [...totalScore]
        if (action === 'dec') {
            if (score > 0) {
                newScoreArray[index] = score - 1
            } else {
                newScoreArray[index] = 0;
            }
        } else {
            newScoreArray[index] = score + 1;
        }
        setTotalScore(newScoreArray)
    }
    return (
        <div className='score-container'>
            {totalScore.map((score, index) => {
                return (
                    <div>
                        <button onClick={() => changeScore(score, index, 'dec')}>-</button>
                        {score}
                        <button onClick={() => changeScore(score, index, 'inc')}>+</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Score